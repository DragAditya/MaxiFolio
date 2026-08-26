# 21st.dev Component Research

The 21st.dev catalogue provides shadcn-compatible React and Tailwind component patterns, with both prompt-copy and CLI installation paths. For this portfolio, the selected patterns are **animated blur-in heading reveals**, **sharpening hover controls**, **scroll-responsive section transitions**, and **interactive navigation states**. The existing project already includes the necessary React, Tailwind, shadcn, Lucide, and Framer Motion foundations, so the components will be rebuilt as lightweight, brand-specific primitives rather than imported as unrelated visual styles.

Sources consulted: <https://21st.dev/> and <https://21st.dev/@waleedkibhen/components/portfolio-hero>.

The component source review confirmed that the portfolio hero pattern is intentionally lightweight, depending on React and Lucide rather than a proprietary runtime. The update will therefore use compatible, local 21st-inspired primitives: blur-in word reveals, a magnetic action control, directional hover states, a persistent index dock, spotlight/tilt evidence surfaces, and scroll-linked progress feedback.

## Official MCP Connection Details

21st.dev documents a streamable-HTTP MCP server at `https://21st.dev/api/mcp`. Its documented configuration uses the header `x-api-key: $API_KEY_21ST`; the page also states that `Authorization: Bearer` is accepted. After connecting, the client should list tools and expose `search`, `get_component`, and related catalogue capabilities. The API key is obtained from the user’s 21st.dev account settings: <https://21st.dev/settings/api-keys>.

## Selected 21st.dev Patterns for the Portfolio

The selected set maintains the existing Quiet Precision system rather than layering unrelated visual treatments over it. **Blur In Text** by animbits (component `19228`) provides the word-level blur-and-focus reveal for landmark headings. **Dock Nav** by soralabs (component `19177`) supplies the expanding, label-led mobile scene dock. **Magnetic Button** by bundui (component `1507`) guides the primary calls to action. **Scroll Progress** by cnippet.dev (component `18716`) shapes the continuous narrative-progress indicator. **Tilt Card** by tom_ui (component `12245`) informs the tactile project-evidence surfaces. The code for Blur In Text and Dock Nav was retrieved and will be adapted to the project’s existing Framer Motion, Lucide, and Tailwind foundations; the other three patterns are already technically compatible with the motion primitives established in the site.
