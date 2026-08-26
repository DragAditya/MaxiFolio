/**
 * Quiet Precision motion primitives: 21st-inspired microinteractions rebuilt locally
 * for a cobalt-and-porcelain editorial portfolio rather than imported as generic widgets.
 */
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { type ReactNode, useRef } from "react";

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
  return (
    <motion.article
      {...props}
      ref={cardRef}
      className={`spotlight-card ${className}`}
      whileHover={{ y: -7, rotateX: 1, rotateY: -1.2, transition: { type: "spring", stiffness: 330, damping: 23 } }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        cardRef.current?.style.setProperty("--spot-x", `${x}%`);
        cardRef.current?.style.setProperty("--spot-y", `${y}%`);
        props.onMouseMove?.(event);
      }}
    >
      {children}
    </motion.article>
  );
}
