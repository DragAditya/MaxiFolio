# Motion Smoothness Audit

## Observed Sources of Perceived Jank

| Area | Current behavior | Likely issue | Correction |
| --- | --- | --- | --- |
| Preloader | A short 650ms minimum and a React state update every 115ms | The loading scene can feel abrupt on cached visits and progress updates trigger repeated component renders while multiple entrance effects run. | Use a deliberate 4-second scene, update the progress beam directly through one animation frame loop, and retain the loader only if resources take longer. |
| Preloader artwork | Two continuous orbit rotations, two fragment entrances, heading entrance, and status-card entrance | Many separate animated layers are visible during the first paint. | Keep one slowly rotating ring, one scan beam, and one staged text entrance. |
| Archive coverflow | Multiple 3D cards animate on every active-card change | The interaction is valuable but should be explicitly composited and confined to its own paint region. | Add transform containment, hide non-visible cards from pointer/paint work, and soften the spring curve. |
| Decorative motion | Several independent perpetual float, marquee, and orbit loops | The page can feel busy and use more simultaneous compositing than necessary. | Preserve the primary hero and archive movement; slow or disable secondary loops on constrained hardware and use only transform/opacity. |
| Glass effects | Blur and blend layers appear in multiple large scenes | These effects can make scrolling feel heavier on lower-end GPUs. | Keep glass for active controls, but remove expensive blur/blend treatment from secondary surfaces on coarse/mobile devices. |

## Implementation Contract

The new preloader will feel intentionally four seconds long, but it will not block resource readiness: it stays visible until both the four-second sequence and the initial resource gate complete. It will use a single direct DOM progress update per animation frame rather than a recurring React state update. The rest of the portfolio keeps the existing visual style and functionality while consolidating long-running effects into lower-cost transform-only layers.
