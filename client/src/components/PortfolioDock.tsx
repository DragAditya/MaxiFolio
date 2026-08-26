/**
 * Scrapbook portfolio dock: warm-paper glass panel, outlined icon tiles, and ReactBits-style pointer proximity magnification.
 */
import { BriefcaseBusiness, Code2, Github, Home, Mail, Terminal } from "lucide-react";
import { motion, MotionValue, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { PointerEvent, RefObject, useRef, useState } from "react";

type DockItem = { href: string; label: string; icon: typeof Home; accent: string };

const items: DockItem[] = [
  { href: "#home", label: "Home", icon: Home, accent: "pink" },
  { href: "#projects", label: "Work", icon: BriefcaseBusiness, accent: "yellow" },
  { href: "#github", label: "GitHub", icon: Github, accent: "blue" },
  { href: "#skills", label: "Skills", icon: Code2, accent: "lime" },
  { href: "#story", label: "Story", icon: Terminal, accent: "pink" },
  { href: "#contact", label: "Contact", icon: Mail, accent: "blue" },
];

function DockButton({ item, pointerX, reducedMotion, onHover, onLeave }: { item: DockItem; pointerX: MotionValue<number>; reducedMotion: boolean | null; onHover: (label: string) => void; onLeave: () => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const size = useTransform(pointerX, (cursorX) => {
    if (reducedMotion || !ref.current) return 40;
    const center = ref.current.offsetLeft + ref.current.offsetWidth / 2;
    const proximity = Math.max(0, 1 - Math.abs(cursorX - center) / 200);
    return 40 + proximity * 30;
  });
  const y = useTransform(size, [40, 70], [0, -14]);
  const Icon = item.icon;

  return <motion.a ref={ref} href={item.href} className={`portfolio-dock-item ${item.accent}`} aria-label={item.label} title={item.label} style={{ width: reducedMotion ? 40 : size, height: reducedMotion ? 40 : size, y: reducedMotion ? 0 : y }} onMouseEnter={() => onHover(item.label)} onMouseLeave={onLeave} onFocus={() => onHover(item.label)} onBlur={onLeave}>
    <Icon aria-hidden="true" />
  </motion.a>;
}

export default function PortfolioDock() {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(-1000);
  const [label, setLabel] = useState<string | null>(null);
  const panelRef = useRef<HTMLElement>(null);

  const move = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== "mouse" || !panelRef.current) return;
    pointerX.set(event.clientX - panelRef.current.getBoundingClientRect().left);
  };

  return <nav ref={panelRef} className="portfolio-dock" aria-label="Portfolio quick navigation" onPointerMove={move} onPointerLeave={() => { pointerX.set(-1000); setLabel(null); }}>
    <span className="portfolio-dock-flag">NAV</span>
    <div className="portfolio-dock-panel" style={{ height: 60 }}>
      {items.map((item) => <DockButton key={item.label} item={item} pointerX={pointerX} reducedMotion={reducedMotion} onHover={setLabel} onLeave={() => setLabel(null)} />)}
    </div>
    <motion.span className="portfolio-dock-label" initial={false} animate={{ opacity: label ? 1 : 0, y: label ? 0 : 4 }}>{label ?? "QUICK NAV"}</motion.span>
  </nav>;
}
