/**
 * Scrapbook launch preloader: waits for initial fonts and images, then reveals the already-mounted application underneath.
 */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const MIN_VISIBLE_MS = 650;
const MAX_WAIT_MS = 3200;

function waitForImage(image: HTMLImageElement) {
  if (image.complete) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const done = () => resolve();
    image.addEventListener("load", done, { once: true });
    image.addEventListener("error", done, { once: true });
  });
}

export default function Preloader() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const startedAt = performance.now();
    let disposed = false;
    const imageResources = Array.from(document.images).map(waitForImage);
    const fontResources = "fonts" in document ? document.fonts.ready.catch(() => undefined) : Promise.resolve();
    const documentReady = document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
    const pulse = window.setInterval(() => {
      setProgress((current) => current >= 88 ? current : Math.min(88, current + Math.max(2, Math.round((88 - current) * .14))));
    }, 115);
    const fallback = new Promise<void>((resolve) => window.setTimeout(resolve, MAX_WAIT_MS));

    Promise.race([Promise.all([documentReady, fontResources, ...imageResources]).then(() => undefined), fallback]).then(async () => {
      const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - startedAt));
      await new Promise<void>((resolve) => window.setTimeout(resolve, remaining));
      if (disposed) return;
      setProgress(100);
      window.setTimeout(() => { if (!disposed) setVisible(false); }, reducedMotion ? 30 : 190);
    });

    return () => { disposed = true; window.clearInterval(pulse); };
  }, [reducedMotion]);

  return <AnimatePresence>
    {visible && <motion.div className="scene-preloader" role="status" aria-live="polite" aria-label="Preparing Aditya Wagh portfolio" initial={{ opacity: 1 }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: "-4%", scale: .98 }} transition={{ duration: reducedMotion ? .12 : .48, ease: [0.23, 1, 0.32, 1] }}>
      <div className="preloader-grid" />
      <motion.div className="preloader-orbit preloader-orbit-one" animate={reducedMotion ? undefined : { rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }} />
      <motion.div className="preloader-orbit preloader-orbit-two" animate={reducedMotion ? undefined : { rotate: -360 }} transition={{ duration: 21, repeat: Infinity, ease: "linear" }} />
      <motion.div className="preloader-fragment preloader-fragment-pink" initial={{ opacity: 0, rotate: -17, x: -26 }} animate={{ opacity: 1, rotate: -7, x: 0 }} transition={{ delay: .05, duration: .5, ease: [0.23, 1, 0.32, 1] }} />
      <motion.div className="preloader-fragment preloader-fragment-blue" initial={{ opacity: 0, rotate: 18, x: 26 }} animate={{ opacity: 1, rotate: 8, x: 0 }} transition={{ delay: .12, duration: .5, ease: [0.23, 1, 0.32, 1] }} />
      <main className="preloader-stage">
        <motion.p className="preloader-eyebrow" initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .06, duration: .35 }}>ADITYA WAGH / PORTFOLIO 2026</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 16, rotate: -1.5 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: .12, duration: .54, ease: [0.23, 1, 0.32, 1] }}>ASSEMBLING<br /><span>THE SCENE.</span></motion.h1>
        <motion.div className="preloader-status-card" initial={{ opacity: 0, y: 12, rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: -1 }} transition={{ delay: .22, duration: .45, ease: [0.23, 1, 0.32, 1] }}>
          <div><i /> LOADING THE PORTFOLIO</div><b>{String(Math.min(progress, 100)).padStart(2, "0")}%</b>
          <span><em style={{ transform: `scaleX(${progress / 100})` }} /></span>
        </motion.div>
        <p className="preloader-note"><i>✦</i> PROJECTS / SYSTEMS / SIGNAL</p>
      </main>
    </motion.div>}
  </AnimatePresence>;
}
