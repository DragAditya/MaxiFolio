/**
 * Scrapbook launch preloader: waits for initial fonts and images, then reveals the already-mounted application underneath.
 */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const MIN_VISIBLE_MS = 4000;
const MAX_RESOURCE_WAIT_MS = 7000;

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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();
    let disposed = false;
    let handoffTimer = 0;
    let exitTimer = 0;
    const imageResources = Array.from(document.images).map(waitForImage);
    const fontResources = "fonts" in document ? document.fonts.ready.catch(() => undefined) : Promise.resolve();
    const documentReady = document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
    const fallback = new Promise<void>((resolve) => window.setTimeout(resolve, MAX_RESOURCE_WAIT_MS));

    Promise.race([Promise.all([documentReady, fontResources, ...imageResources]).then(() => undefined), fallback]).then(async () => {
      const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - startedAt));
      await new Promise<void>((resolve) => window.setTimeout(resolve, remaining));
      if (disposed) return;
      setReady(true);
      handoffTimer = window.setTimeout(() => { if (!disposed) setVisible(false); }, reducedMotion ? 40 : 300);
    });

    return () => { disposed = true; window.clearTimeout(handoffTimer); window.clearTimeout(exitTimer); };
  }, [reducedMotion]);

  return <AnimatePresence>
    {visible && <motion.div className={`scene-preloader ${ready ? "is-ready" : ""}`} role="status" aria-live="polite" aria-label="Preparing Aditya Wagh portfolio" initial={{ opacity: 1 }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: "-2%", scale: .99 }} transition={{ duration: reducedMotion ? .12 : .36, ease: [0.23, 1, 0.32, 1] }}>
      <div className="preloader-grid" />
      <motion.div className="preloader-orbit preloader-orbit-one" animate={reducedMotion ? undefined : { rotate: 360 }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }} />
      <div className="preloader-fragment preloader-fragment-pink" />
      <div className="preloader-fragment preloader-fragment-blue" />
      <motion.main className="preloader-stage" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? .01 : .46, ease: [0.23, 1, 0.32, 1] }}>
        <p className="preloader-eyebrow">ADITYA WAGH / PORTFOLIO 2026</p>
        <h1>ASSEMBLING<br /><span>THE SCENE.</span></h1>
        <div className="preloader-status-card">
          <div><i /> {ready ? "SCENE READY" : "BUILDING THE PORTFOLIO"}</div><b>{ready ? "100%" : "4.0S"}</b>
          <span><em /></span>
        </div>
        <p className="preloader-note"><i>✦</i> PROJECTS / SYSTEMS / SIGNAL</p>
      </motion.main>
    </motion.div>}
  </AnimatePresence>;
}
