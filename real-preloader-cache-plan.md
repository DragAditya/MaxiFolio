# Real Preloader and Offline Cache Plan

## Launch Behavior

The preloader will no longer wait a fixed four seconds. It will start immediately, track a real readiness gate, and exit as soon as the following are complete:

1. The browser document has loaded.
2. Web fonts are ready or have safely failed.
3. The visible hero image and logo image have loaded or safely failed.
4. The service worker has begun caching the app shell and critical visual assets when the browser supports it.

The progress indicator will use three visible phases—scene shell, visual assets, and ready—and will never hold a fast cached visit open merely to satisfy a timer. A 5.5-second safety fallback prevents a broken resource from blocking entry.

## Offline Cache Contract

The static service worker will pre-cache the root app shell and the portfolio’s critical image set: hero responsive variants, project responsive variants, and the AW mark. Navigation requests use network-first with cached app-shell fallback; static resources and `/manus-storage/` visuals use stale-while-revalidate. The cache name is versioned so obsolete cache entries are removed on activation.

## Motion Contract

The initial loader uses a single CSS progress animation and two low-cost transform/opacity layers. The archive carousel remains view-aware, pauses when the tab is hidden, confines transformed cards to its own paint region, and keeps only nearby cards interactive. This improves smoothness but does not claim a fixed 90 FPS on every device.
