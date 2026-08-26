/**
 * Scrapbook portfolio dock: warm-paper glass panel, outlined icon tiles, and ReactBits-style pointer proximity magnification.
 */
import { BriefcaseBusiness, Code2, Github, Home, Mail, Terminal } from "lucide-react";
import { motion, MotionValue, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { type PointerEvent, useEffect, useRef, useState } from "react";

type DockItem = { id: string; href: string; label: string; icon: typeof Home; accent: string };

const items: DockItem[] = [
  { id: "home", href: "#home", label: "Home", icon: Home, accent: "pink" },
  { id: "projects", href: "#projects", label: "Work", icon: BriefcaseBusiness, accent: "yellow" },
  { id: "github", href: "#github", label: "GitHub", icon: Github, accent: "blue" },
  { id: "skills", href: "#skills", label: "Skills", icon: Code2, accent: "lime" },
  { id: "story", href: "#story", label: "Story", icon: Terminal, accent: "pink" },
  { id: "contact", href: "#contact", label: "Contact", icon: Mail, accent: "blue" },
];

function DockButton({ item, pointerX, reducedMotion, active, onHover, onLeave, onActivate }: { item: DockItem; pointerX: MotionValue<number>; reducedMotion: boolean | null; active: boolean; onHover: (label: string) => void; onLeave: () => void; onActivate: (id: string) => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const size = useTransform(pointerX, (cursorX) => {
    if (reducedMotion || !ref.current) return 40;
    const center = ref.current.offsetLeft + ref.current.offsetWidth / 2;
    const proximity = Math.max(0, 1 - Math.abs(cursorX - center) / 200);
    return 40 + proximity * 30;
  });
  const y = useTransform(size, [40, 70], [0, -14]);
  const Icon = item.icon;

  return <motion.a ref={ref} href={item.href} className={`portfolio-dock-item ${item.accent} ${active ? "is-active" : ""}`} aria-label={item.label} aria-current={active ? "page" : undefined} title={item.label} style={{ width: reducedMotion ? 40 : size, height: reducedMotion ? 40 : size, y: reducedMotion ? 0 : y }} onClick={() => onActivate(item.id)} onMouseEnter={() => onHover(item.label)} onMouseLeave={onLeave} onFocus={() => onHover(item.label)} onBlur={onLeave}>
    <Icon aria-hidden="true" />
  </motion.a>;
}

export default function PortfolioDock() {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(-1000);
  const [label, setLabel] = useState<string | null>(null);
  const [activeId, setActiveId] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveId(visible.target.id);
    }, { rootMargin: "-34% 0px -52%", threshold: [0.08, .3, .6] });
    items.forEach((item) => { const target = document.getElementById(item.id); if (target) observer.observe(target); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 340);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const move = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType !== "mouse" || !panelRef.current) return;
    pointerX.set(event.clientX - panelRef.current.getBoundingClientRect().left);
  };

  const activeItem = items.find((item) => item.id === activeId) ?? items[0];
  const visibleLabel = label ?? activeItem.label;

  return <nav ref={panelRef} className={`portfolio-dock ${scrolled ? "is-engaged" : "is-idle"}`} aria-label="Portfolio quick navigation" onPointerMove={move} onPointerLeave={() => { pointerX.set(-1000); setLabel(null); }}>
    <div className="portfolio-dock-console"><span><i /> PORTFOLIO CONTROL</span><strong><b>{String(items.indexOf(activeItem) + 1).padStart(2, "0")}</b> / {visibleLabel}</strong><em><i /> LIVE</em></div>
    <span className="portfolio-dock-flag">NAV / 06</span>
    <div className="portfolio-dock-panel" style={{ height: 60 }}>
      <span className="portfolio-dock-scan" aria-hidden="true" />
      {items.map((item) => <DockButton key={item.label} item={item} pointerX={pointerX} reducedMotion={reducedMotion} active={activeId === item.id} onHover={setLabel} onLeave={() => setLabel(null)} onActivate={setActiveId} />)}
    </div>
    <motion.span className="portfolio-dock-label" initial={false} animate={{ opacity: label ? 1 : 0, y: label ? 0 : 4 }}>{label ?? "QUICK NAV"}</motion.span>
  </nav>;
}
