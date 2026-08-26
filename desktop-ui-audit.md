# Desktop UI Audit — Portfolio Visual-System Correction

## Audit Basis

This audit uses the user-provided section screenshots as the ground truth. The attached images are **not** website assets and will not be reused. The review also applies the current desktop layout, color, typography, and accessibility guidance from the UI design skill.

## Cross-Section Findings

| Severity | Repeated issue | Evidence across the supplied sections | Desktop correction |
| --- | --- | --- | --- |
| High | **Composition has no consistent desktop grid.** | Hero, Skills, Story, Awards, and Contact each place a small content cluster inside a much larger colored field, leaving dead zones that do not reinforce the narrative. | Use one 12-column / two-rail desktop system: a fixed editorial rail for chapter metadata and a main evidence canvas with deliberate 7/5 or 8/4 splits. |
| High | **Hierarchy is driven by decoration instead of content.** | Tape, starbursts, orbit rings, shadows, tickers, and stickers often carry as much emphasis as the project title, work proof, or contact action. | Keep the scrapbook vocabulary, but assign one hero object and one accent treatment per scene. Demote all other ornaments into low-opacity background layers. |
| High | **Type scale varies without a stable rhythm.** | Oversized headings collide with handwritten emphasis; card labels and descriptions vary sharply from one scene to the next. | Lock a desktop scale: chapter label 11–12px mono, display 56–86px, subhead 20–28px, body 15–17px. Use the handwritten face only once per chapter as a small accent—not as a second headline. |
| High | **Project, story, and award evidence is unevenly staged.** | Project cards create a 2+1 pyramid with a weak third card; the story cards stretch across large empty areas; the credential artifact becomes too narrow to scan. | Reframe each evidence section as a coherent desktop board: balanced cards on a shared baseline, clear primary/secondary item sizing, and readable metadata rails. |
| Medium | **Color fields do not have a defined job.** | The lime skill field, pink contact field, yellow award field, and transition gradients all compete at full saturation. | Preserve the pastel scrapbook brand but reserve saturated pink/lime/yellow for focal surfaces, active controls, or small annotations. Use warm paper, pale lilac, and navy chambers as restorative negative space. |
| Medium | **The GitHub chamber does not use its large dark field efficiently.** | The coverflow is visually interesting but the surrounding explanatory content is too small and the field reads sparse. | Put the repository story and active-repo data on a stable side rail; reserve the center for the active repository object, with card depth behind it. |
| Medium | **The dock is visually separate from the desktop narrative.** | A fixed control can overlap or compete with hero/contact compositions when treated as another decorative object. | Make desktop navigation an editorial side rail that appears after the hero, while retaining the compact bottom dock only on mobile. |

## Design Decisions

The correction will **not** switch the site to Quiet Precision or erase its Pinterest/scrapbook personality. Instead, it will make the current style feel authored: fewer competing stickers, a shared desktop grid, wider evidence surfaces, repeatable typography roles, smaller accent density, and navigation that behaves like a tool rather than another poster.

## Design Principles Applied

> **Layout:** Essential content needs enough space and related content needs clear grouping; controls must remain visually distinct from the content they navigate.

> **Typography:** A custom interface should minimize typeface roles and preserve a clear relative hierarchy through size, weight, and leading.

> **Color:** Color should carry a consistent role, and no core state should depend on color alone.

> **Accessibility:** Small desktop text needs adequate contrast, controls need adequate target size and spacing, and repeated automatic motion must offer a reduced-motion fallback.
