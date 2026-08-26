/**
 * Quiet Precision motion primitives: selected 21st.dev patterns adapted locally
 * for a cobalt-and-porcelain editorial portfolio rather than imported as generic widgets.
 */
import { motion, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps, type MotionValue } from "framer-motion";
import { type ReactNode, useRef, useState } from "react";

/** Adapted from 21st.dev's Blur In Text component (animbits, id 19228). */
export function TextBlurIn({
  children,
  className = "",
  duration = 0.62,
  delay = 0,
  staggerDelay = 0.035,
}: {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  staggerDelay?: number;
}) {
  const words = children.split(" ");
  return (
    <motion.p className={className} initial="hidden" animate="visible" aria-label={children}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="text-blur-unit"
          variants={{ hidden: { opacity: 0, y: 7, filter: "blur(9px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
          transition={{ duration, delay: delay + index * staggerDelay, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}{index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.p>
  );
}

export function BlurInWords({
  words,
  className = "",
  delay = 0,
}: {
  words: ReactNode[];
  className?: string;
  delay?: number;
}) {
  return (
    <span className={className} aria-label={words.map((word) => String(word)).join(" ")}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          className="kinetic-word"
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: delay + index * 0.055, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function MagneticLink({ children, className = "", ...props }: HTMLMotionProps<"a">) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 15, mass: 0.14 });
  const springY = useSpring(y, { stiffness: 260, damping: 15, mass: 0.14 });

  return (
    <motion.a
      {...props}
      className={className}
      style={{ x: springX, y: springY, ...props.style }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - (bounds.left + bounds.width / 2)) * 0.16);
        y.set((event.clientY - (bounds.top + bounds.height / 2)) * 0.16);
        props.onMouseMove?.(event);
      }}
      onMouseLeave={(event) => {
        x.set(0);
        y.set(0);
        props.onMouseLeave?.(event);
      }}
    >
      {children}
    </motion.a>
  );
}

export function SpotlightCard({ children, className = "", ...props }: HTMLMotionProps<"article">) {
  const cardRef = useRef<HTMLElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 19, mass: 0.24 });
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 19, mass: 0.24 });
  return (
    <motion.article
      {...props}
      ref={cardRef}
      className={`spotlight-card ${className}`}
      style={{ rotateX: springRotateX, rotateY: springRotateY, ...props.style }}
      whileHover={{ y: -7, transition: { type: "spring", stiffness: 330, damping: 23 } }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        cardRef.current?.style.setProperty("--spot-x", `${x}%`);
        cardRef.current?.style.setProperty("--spot-y", `${y}%`);
        rotateX.set((y - 50) * -0.06);
        rotateY.set((x - 50) * 0.06);
        props.onMouseMove?.(event);
      }}
      onMouseLeave={(event) => {
        rotateX.set(0);
        rotateY.set(0);
        props.onMouseLeave?.(event);
      }}
    >
      {children}
    </motion.article>
  );
}

/** Adapted from 21st.dev's Dock Nav component (soralabs, id 19177). */
export function SceneDock({
  items,
  activeHref,
}: {
  items: { label: string; href: string; icon: ReactNode }[];
  activeHref: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const getWidth = (index: number, isActive: boolean) => {
    if (isActive) return "5.7rem";
    if (hoveredIndex === index) return "4.65rem";
    if (hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1) return "3.4rem";
    return "2.9rem";
  };

  return (
    <nav className="mobile-scene-dock" aria-label="Scene navigation">
      <ul>
        {items.map((item, index) => {
          const isActive = item.href === activeHref;
          return (
            <motion.li
              key={item.label}
              animate={{ width: reducedMotion ? (isActive ? "5.7rem" : "2.9rem") : getWidth(index, isActive) }}
              transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a href={item.href} className={isActive ? "is-active" : ""} aria-current={isActive ? "page" : undefined}>
                <span className="dock-icon">{item.icon}</span>
                <motion.span className="dock-label" animate={{ opacity: isActive || hoveredIndex === index ? 1 : 0, x: isActive || hoveredIndex === index ? 0 : -4 }} transition={{ duration: .18 }}>{item.label}</motion.span>
              </a>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Adapted from 21st.dev scroll-progress patterns (cnippet.dev, id 18716). */
export function ScrollMeter({ progress }: { progress: MotionValue<number> }) {
  return <motion.div className="scroll-meter" style={{ scaleX: progress }} aria-hidden="true" />;
}
