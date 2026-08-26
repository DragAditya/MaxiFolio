/**
 * Chromatic Index component system — local adaptations of 21st.dev patterns:
 * blur text, magnetic controls, tilt cards, segmented tabs, counters, dock navigation, and disclosure rows.
 */
import { AnimatePresence, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring } from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function BlurWords({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="index-blur-word"
          aria-hidden="true"
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: delay + index * 0.045, duration: 0.58, ease: EASE }}
        >
          {word}{index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

export function MagneticAnchor({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.25 });
  return (
    <motion.a
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        if (reduced) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - (bounds.left + bounds.width / 2)) * 0.11);
        y.set((event.clientY - (bounds.top + bounds.height / 2)) * 0.11);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

export function TiltSurface({ children, className = "", onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 220, damping: 20, mass: 0.22 });
  const rotateY = useSpring(y, { stiffness: 220, damping: 20, mass: 0.22 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  return (
    <motion.article
      ref={ref}
      className={`index-tilt-surface ${className}`}
      style={{ rotateX, rotateY, "--spot-x": `${spotlight.x}%`, "--spot-y": `${spotlight.y}%` } as React.CSSProperties}
      onClick={onClick}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const nextX = ((event.clientX - bounds.left) / bounds.width) * 100;
        const nextY = ((event.clientY - bounds.top) / bounds.height) * 100;
        setSpotlight({ x: nextX, y: nextY });
        x.set((nextY - 50) * -0.055);
        y.set((nextX - 50) * 0.055);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      {children}
    </motion.article>
  );
}

export function SegmentedIndex({ items, active, onChange }: { items: string[]; active: string; onChange: (item: string) => void }) {
  return (
    <div className="index-segmented" role="tablist" aria-label="Capability focus">
      {items.map((item) => (
        <button key={item} role="tab" aria-selected={active === item} className={active === item ? "is-active" : ""} onClick={() => onChange(item)}>
          {active === item && <motion.span className="index-segment-thumb" layoutId="index-segment-thumb" transition={{ type: "spring", stiffness: 340, damping: 28 }} />}
          <span>{item}</span>
        </button>
      ))}
    </div>
  );
}

export function NumberTicker({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.65 });
  const source = useMotionValue(0);
  const spring = useSpring(source, { stiffness: 86, damping: 18, mass: 0.55 });
  const [display, setDisplay] = useState(0);
  useEffect(() => { if (inView) source.set(value); }, [inView, source, value]);
  useMotionValueEvent(spring, "change", (latest) => setDisplay(Math.round(latest)));
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

export function ExpandRow({ title, eyebrow, children, open, onToggle }: { title: string; eyebrow: string; children: ReactNode; open: boolean; onToggle: () => void }) {
  return (
    <article className={`index-expand-row ${open ? "is-open" : ""}`}>
      <button onClick={onToggle} aria-expanded={open} className="index-expand-trigger">
        <span className="index-expand-meta">{eyebrow}</span><span className="index-expand-title">{title}</span><span className="index-expand-symbol">{open ? "−" : "+"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && <motion.div className="index-expand-body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: EASE }}><div>{children}</div></motion.div>}
      </AnimatePresence>
    </article>
  );
}

export function IndexDock({ items, active }: { items: { label: string; href: string; icon: ReactNode }[]; active: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return <nav className="index-dock" aria-label="Quick section navigation"><ul>{items.map((item, index) => {
    const selected = active === item.href.slice(1);
    const width = selected ? "5.5rem" : hovered === index ? "4.6rem" : hovered !== null && Math.abs(hovered - index) === 1 ? "3.55rem" : "2.85rem";
    return <motion.li key={item.label} animate={{ width }} transition={{ duration: .3, ease: EASE }} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)}><a href={item.href} className={selected ? "is-active" : ""} aria-current={selected ? "page" : undefined}><i>{item.icon}</i><motion.span animate={{ opacity: selected || hovered === index ? 1 : 0, x: selected || hovered === index ? 0 : -5 }}>{item.label}</motion.span></a></motion.li>;
  })}</ul></nav>;
}

export function SignalMarquee({ items }: { items: string[] }) {
  return <div className="index-marquee" aria-label="Technical strengths"><div className="index-marquee-track">{[...items, ...items].map((item, index) => <span key={`${item}-${index}`}><b>✦</b>{item}</span>)}</div></div>;
}
