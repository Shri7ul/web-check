# URRT — Interactive Robotics Ecosystem · Final Delivery

**UIU Rescue Rover Team** · Next.js App Router · React · TypeScript · direct Three.js

This document is the delivery companion to the source code. It covers the design
tokens, architecture, content schemas, asset provenance, Three.js scene
architecture, route inventory, test/verification results, performance results,
known limitations and deployment instructions.

---

## 1. Provenance and source rules

The working directory already contained a complete implementation of this
specification. This delivery **verifies and hardens** that implementation rather
than discarding it: the authentic, recovered content and media were preserved,
and the visual identity is the distinct URRT design system defined below (not a
copy of the official `rescuerover.uiu.ac.bd` layout).

Authoritative content sources:

- Crawled snapshots of the official URRT site in `.research/` (`index.txt`,
  `projects.txt`, `member.txt`, `Advisors.txt`, `gears.txt`, `Join.txt`,
  `contact.txt`, `sponsor.txt`, `video.txt`, `Assets.txt`, `webmaster.txt`).
- Recovered, validated media in `public/assets/`, catalogued in
  `src/content/assets.ts`.
- Reference sites (`bengalsub.com`, `teamhector.de`) were used as design
  influences only; nothing was cloned.

Content rules applied throughout:

- Nothing invented. Missing technical values are omitted or labelled
  **"Not published"**; uncertain claims carry a verification status.
- No unrelated **UIU Mars Rover Team (UMRT)** imagery, achievements or rovers are
  attributed to URRT. The official site's homepage mixes UMRT achievements into
  its own content; those were deliberately excluded from URRT pages.
- No real-world disaster deployment is claimed.
- No conceptual model is presented as an actual URRT robot; the one official
  cinematic render is explicitly labelled as a visualization, not a photograph.
- No fabricated experiment charts or telemetry; no validated numeric datasets
  exist, and the Explorer states this explicitly.

> **Note:** the "URRT redesign blueprint PDF" referenced in the brief was not
> present in the workspace. The crawled official-site snapshots in `.research/`
> served as the authoritative content/requirements source instead. See
> *Known limitations*.

---

## 2. Stack and scripts

| | |
|---|---|
| Framework | Next.js **15.5.29** (App Router) |
| UI | React **19.1.1** |
| Language | TypeScript **5.9.2** |
| 3D | Three.js **0.180.0**, used directly (no React Three Fiber) |
| CSS | Plain CSS with a consistent prefix architecture (no framework) |
| Tests | Playwright **1.56.1** |
| Lint | ESLint 9 + `eslint-config-next` |

```bash
npm run dev        # dev server on :3000
npm run build      # production build
npm run start      # serve the production build on :3000
npm run typecheck  # tsc --noEmit
npm run lint       # eslint "src/**/*.{ts,tsx}"
npm run test:e2e   # Playwright (starts/reuses :3000)
```

Dependencies are intentionally minimal: `next`, `react`, `react-dom`, `three`
plus dev tooling only.

---

## 3. Design system and tokens

All tokens are centralised in `src/app/globals.css` (`:root`). They are
**proposed design tokens, not verified official URRT brand colours**.

### Dark surfaces

| Token | Value | Use |
|---|---|---|
| `--obsidian` | `#0B1112` | primary dark background |
| `--deep-forest` | `#14201C` | cinematic section background |
| `--panel` | `#1C2924` | raised dark panels |
| `--panel-2` / `--panel-3` | `#22312A` / `#2A3A31` | subtle depth steps |

### Accent

| Token | Value | Use |
|---|---|---|
| `--signal-lime` | `#B7F36B` | selected nodes, primary CTAs, focus, hotspots |
| `--signal-lime-dim` | `#94C951` | secondary lime |
| `--forest-green` | `#244A35` | light-section accent |
| `--soft-green` | `#DCE5D7` | light green text/detail |

### Light surfaces and ink

| Token | Value |
|---|---|
| `--paper` | `#F2F1EA` |
| `--white` | `#FFFFFF` |
| `--border` | `#D3D9D0` |
| `--ink` / `--ink-soft` / `--ink-muted` | `#0B1112` / `#3B443C` / `#5E6A60` |
| `--on-dark` / `--on-dark-soft` / `--on-dark-muted` | `#F2F1EA` / 72% / 50% |

### Lines

`--line-dark` `rgba(220,229,215,0.16)`, `--line-dark-strong` `0.32`,
`--line-paper` `rgba(11,17,18,0.16)`, `--line-paper-strong` `0.34`.

### Typography

| Role | Family |
|---|---|
| Display | `Archivo`, fallback `Space Grotesk` |
| Body | `Inter` |
| Technical labels | `IBM Plex Mono` |
| Editorial accent (selective italic) | `Source Serif 4` |

Type scale utilities: `.t-hero`, `.t-h1`, `.t-h2`, `.t-h3`, `.t-display`,
`.t-lead`, `.t-body`, `.t-small`, `.t-mono`, `.t-serif`, `.t-num`.

### Layout and motion

`--maxw: 1440px`, `--gutter: clamp(20px, 5vw, 88px)`,
`--section-y: clamp(80px, 11vw, 172px)`, `--radius: 2px` (deliberately minimal),
`--header-h: 76px`, `--ease: cubic-bezier(0.22, 1, 0.36, 1)`, `--dur: 0.7s`.

### Contrast validation

- Signal lime `#B7F36B` on obsidian `#0B1112`: very high contrast; used for
  focus rings, CTAs and active nodes.
- Paper/ink pairs (`#F2F1EA` on `#0B1112`) and `--ink-soft`/`--ink-muted` on
  paper clear body-text contrast.
- On light sections, lime is replaced by `--forest-green` (`#244A35`) to keep
  the accent readable on paper.
- `:focus-visible` is a 2px lime outline (ink outline on light sections),
  always visible and never removed.

### CSS architecture

| File | Responsibility |
|---|---|
| `src/app/globals.css` | tokens, reset, typography, layout grid, scenes, shared components, header/footer, hero, utilities, reduced motion, responsive |
| `src/app/experience.css` | homepage scenes 02–09, robot grid, full-screen product overlay, 3D tree, 2D tree |
| `src/app/pages.css` | subpage heroes, cards, tables, evidence/research/timeline, contact |

Class prefixes: `.t-*` type · `.l-*` layout · `.c-*` components · `.s-*` scenes
· `.u-*` utilities · `.pg-*` subpages · `.ru-*` robot universe · `.ro-*` overlay
· `.tree3d-*`/`.tree2d-*` tree.

---

## 4. Application architecture

```
src/
  app/
    layout.tsx              root layout (header, footer, metadata, fonts, skip link)
    page.tsx                homepage — ten-scene narrative
    globals.css / experience.css / pages.css
    robots/                 /robots + /robots/[slug] (SSG deep links)
    engineering/ people/ research/ research/[slug]/
    experiments/ experiments/[slug]/ journey/ resources/
    join/ collaborate/ contact/ not-found.tsx
  components/
    home/                   10 scene components (server unless interactive)
    layout/                 SiteHeader, SiteFooter, PageHero
    robots/                 RobotsExplorer (grid + full-screen overlay, client)
    three/                  EngineeringTree3D, HeroDepth (lazy), Tree2D,
                            NodeDetailPanel, TreeLegend
    pages/                  EvidenceExplorer
    ui/                     Reveal, SceneHead
  content/                  structured content modules (see §6)
  lib/
    types.ts                all content interfaces
    tree.ts                 tree indexing (roots, parent/child/depth maps, ancestor path)
    three/lifecycle.ts      shared WebGL lifecycle controller
    webgl.ts                WebGL feature detection
    useReducedMotion.ts     stable reduced-motion store
e2e/                        Playwright suites (home, robots, tree, content)
public/assets/              recovered authentic media
.research/                  Phase-1 crawled source snapshots
screenshots/                final browser screenshots + performance.json
```

**Server components by default.** Only interactive pieces are client
components: `RobotsExplorer`, the tree modules, `Reveal`, `EvidenceExplorer`,
`SiteHeader` (scroll/menu), and the lazy 3D layers. 3D scenes are loaded with
`next/dynamic({ ssr: false })`, so Three.js never enters the initial server
bundle or the first-load JS for a page until the scene is actually needed.

---

## 5. Route inventory

14 authored routes, **25 statically prerendered pages** (including dynamic
slugs via `generateStaticParams`). No empty placeholder routes.

| Route | Purpose | Scene |
|---|---|---|
| `/` | Ten-scene cinematic homepage | 01–10 |
| `/robots` | Robot Universe product grid | 03 |
| `/robots/[slug]` | Direct-link product overlay (`aegis`, `zugbee-x1`) | 03 |
| `/engineering` | Annotated rover, 8 subsystem categories, build process | 04–05 |
| `/people` | Engineering Tree (3D/2D) + roster + advisors | 06 |
| `/research` | Five documented research focus areas | 07 |
| `/research/[slug]` | Research topic detail (5 prerendered) | 07 |
| `/experiments` | Searchable evidence explorer | 07 |
| `/experiments/[slug]` | Evidence record detail (4 prerendered) | 07 |
| `/journey` | Verified chronological timeline | 08 |
| `/resources` | Authentic asset manifest table + qualification video | — |
| `/join` | Recruitment pathways | 09 |
| `/collaborate` | Partnership / sponsorship pathways | 09 |
| `/contact` | Verified contact channels | 10 |

Dynamic slug pages are pre-rendered at build time; `/robots/[slug]` additionally
supports client-side overlay open/close with `history.pushState`, browser
back/forward, direct URL entry, Escape-to-close and focus restoration.

---

## 6. Structured content model and schemas

All interfaces live in `src/lib/types.ts`. Every content module is a typed TS
data file (equivalent to structured JSON/CSV), which keeps relationships
consistent and lets the build fail on malformed data.

**Core interface chain:**

```
Robot → subsystem → design decision → experiment → result → evidence
Member → verified role → contribution
Subteam → project → relevant robot or subsystem
Competition → verified participation → outcome
```

`Verification = "verified" | "self-reported" | "unverified" | "not-published"`
is carried on assets, specs, timeline events, tree nodes and evidence items.

### Rover product data schema (`Rover`)

`slug`, `name`, `version`, `versionLabel`, `status`, `statusKind`,
`designation`, `tagline`, `description`, `longDescription`, `intro`,
`features[]`, `specifications: SpecItem[]`, `gallery: GalleryImage[]`,
`heroImage`, `accentImage`, `hotspots: Hotspot[]`,
`subsystems: RoverSubsystem[]`, `capabilities[]`, `limitations[]`,
`history: HistoryEvent[]`, `relatedExperiments[]`.

- `SpecItem { label, value, verification? }` — unpublished values are the literal
  string `"Not published"`, rendered with a distinct `.is-missing` style.
- `Hotspot { id, x, y, label, subsystemId, image }` — percentage coordinates
  over an authentic photograph, linked to a documented subsystem.
- `RoverSubsystem { id, title, summary, technical, specs[], status,
  limitations, relatedExperiments[], verification }`.
- `HistoryEvent { date, title, description, status: completed | in-progress |
  planned }` — planned work is visually separated from completed work.

Two verified platforms: **AEGIS (V2, tracked UGV, in development)** and
**Zugbee X1 (V1, legacy, completed January 2025)** — transcribed from
`projects.html`.

### Engineering Tree data schema

`TreeNode { id, label, kind, subtitle?, detail?, meta?, verification? }`
`TreeEdge { from, to, kind, label? }`
`TreeGraph { nodes: TreeNode[], edges: TreeEdge[] }`

- `NodeKind = root | subteam | group | member | project | discipline | role`
- `RelationKind = hierarchy | contribution | collaboration`

Relationship types are **explicit and not conflated**:

| Kind | Visual | Meaning |
|---|---|---|
| `hierarchy` | solid tube | published organisational structure (who belongs to which team) |
| `collaboration` | dashed lime line | team-level engineering relationship (subteam ↔ platform); **not** a claim about any individual's contribution |
| `contribution` | solid light line | a documented influence between two platforms (Zugbee X1 → AEGIS) |

`src/content/tree.ts` builds **30 nodes** (verified in-browser) from the root,
4 subteams, 15 members, 3 advisory roles, platforms, disciplines and groups.
Individual member contributions are **not published**, so member nodes are
`verification: "not-published"` and no invented per-member edges exist.
`src/lib/tree.ts` derives `roots`, `childrenMap`, `parentMap`, `depthMap` and
`ancestorPath()` used by both the 3D and 2D trees.

### Other schemas

`Challenge` (human problems), `BuildStage` (6-stage engineering journey),
`Member`/`Advisor`/`Subteam`, `TimelineEvent`, `ResearchTopic`, `EvidenceItem`,
`AssetRecord`. Evidence records expose question, setup, conditions, protocol,
trial count, measurements, results, failures, limitations and evidence files —
with missing fields labelled rather than filled.

---

## 7. Authentic asset manifest

`src/content/assets.ts` — **48 records**, each with:

`id`, `originalUrl`, `sourcePage`, `subject`, `localPath`, `caption`, `alt`,
`mime`, `dimensions`, `permission`, `verification`, `note?`.

Recovered groups:

- **Rovers:** 3 AEGIS photographs + 4 Zugbee X1 photographs (from `projects.html`).
- **Brand:** URRT primary logo, white-field logo, wordmark, RoboCup 2026 mark,
  UIU and CAIR institutional logos.
- **Partners:** SolidWorks, Dassault Systèmes, Protospace, DFRobot.
- **People:** team photo, 3 advisor/director portraits, 15 member portraits.
- **Scenes:** 10 team/community photographs (no specific event claims attached).
- **Visualization:** 1 official cinematic still, explicitly *not* a photograph.
- **Merchandise:** 1 branded cap.

Validation performed during Phase 1: MIME type, HTTP response, dimensions and
actual image decoding. Browser verification additionally confirmed **zero
broken images** after all lazy content is triggered (E2E `home.spec.ts`).

The full manifest is rendered publicly at **`/resources`** (sortable table with
>40 rows, E2E-verified) and the official qualification video is embedded there.

**Licensing:** no separate license is published on the source site. All records
are marked "Reproduced from the official URRT website; no separate license
published — confirm before commercial use." Verify permission before any
commercial deployment.

---

## 8. Three.js scene architecture

Direct Three.js only. No React Three Fiber. Three meaningful uses:

1. **`HeroDepth`** (Scene 01) — restrained particle + technical-grid depth layer
   behind the authentic hero photograph. Lazy, `ssr: false`, low opacity,
   pointer parallax, never blocks content.
2. **`EngineeringTree3D`** (Scene 06 / `/people`) — the signature experience.
3. **Interactive engineering visualizations** — the 3D tree's raycasting,
   camera focus, search and breadcrumb navigation.

### Shared lifecycle (`src/lib/three/lifecycle.ts`)

Every scene is a `SceneModule { scene, camera, update?, resize?, dispose? }`
managed by `RenderLifecycle`, which provides:

- Managed `WebGLRenderer` creation, `setPixelRatio`, `setSize` and clear colour.
- **Controlled animation loop** driven by `requestAnimationFrame`, started only
  when `animate && !reducedMotion && onScreen && pageVisible`.
- **IntersectionObserver** pauses any scene that scrolls off-screen — so
  multiple 3D scenes never run simultaneously.
- **ResizeObserver** handles responsive resize and updates the perspective
  camera aspect.
- **Pixel ratio cap** `1.75` (or `1.25` in low-power/tablet mode).
- **Reduced motion**: a single static frame via `renderOnce()` instead of a loop.
- **Context-loss handling**: `webglcontextlost` / `webglcontextrestored`
  listeners stop, resize and re-sync the loop.
- **Full disposal**: module cleanup, recursive `disposeObject()` for all
  geometries/materials/textures, `renderer.dispose()` and `forceContextLoss()`.
- `lowPower` reduces particle counts, disables antialiasing and lowers DPR.

### Scene modules

- **`EngineeringTree3D`** — deterministic layout (root at the base, subteams
  fan upward, members/projects as smaller nodes), `CatmullRomCurve3` curved
  connections, `TubeGeometry` for hierarchy edges, dashed lines for
  collaboration, HTML label overlay projected from 3D positions, a halo for
  hover/selection, `OrbitControls` (damping, min/max distance, polar limits,
  no pan), **raycasting** for node selection, eased camera tween on focus,
  search highlighting, collapse/expand, breadcrumbs, reset view, and a
  `NodeDetailPanel` + `TreeLegend`.
- **`Tree2D`** — the fully accessible, keyboard-navigable alternative with the
  same information and relationship semantics.
- **Responsive policy:** desktop → full 3D; tablet → reduced-complexity 3D
  (`lowPower`); mobile (<768px) → simplified 2D tree. WebGL-unavailable →
  2D fallback. Essential content never depends on WebGL.

### Rover 3D inspection honesty

No authentic GLB/GLTF model of either rover is published or authorised, so
**no fabricated 3D model is presented**. The product overlay states this
explicitly and provides annotated photographs + SVG-free hotspot buttons for
component inspection instead. A conceptual model would be labelled
"Conceptual"; none is used.

---

## 9. Homepage experience (ten scenes)

| # | Scene | Component | Interaction |
|---|---|---|---|
| 01 | The Mission | `Hero`, `MissionBand` | authentic AEGIS hero, official logo, 2 CTAs, subtle 3D depth |
| 02 | The Human Problem | `HumanProblem` | selectable challenges → visual highlight, plain-language explanation, engineering challenge, subsystem link |
| 03 | Meet the Machines | `MeetMachines` | both verified rovers, authentic images, explore affordance |
| 04 | Inside the Robot | `InsideRobot` | annotated rover with 8 documented subsystems, mouse/touch/keyboard |
| 05 | How We Build | `HowWeBuild` | 6-stage journey: discovery → design → prototype → integration → testing → iteration |
| 06 | The Engineering Tree | `EngineeringTreeSection` | full 3D branching tree + 2D alternative |
| 07 | Research & Experiments | `ResearchSection` | documented focus areas and evidence, no fabricated charts |
| 08 | The Journey | `JourneySection` | completed / in-progress / planned separated |
| 09 | Join the Work | `JoinSection` | recruitment, collaboration, sponsorship, contact CTAs |
| 10 | Footer | `SiteFooter` | verified contact, university attribution, navigation, official socials |

The first viewport renders immediately — no intro animation gates content.

### Full-screen product overlay

`RobotsExplorer` provides: circular clip-path **tile-to-overlay expansion** and
reverse close (FLIP-equivalent, token-guarded against rapid open/close races),
large gallery with previous/next, touch swipe, thumbnails and counter, product
introduction, technical specifications (with "Not published" styling),
interactive component hotspots, architecture/subsystem details, development
history, capabilities/limitations, related evidence, direct URL support,
browser back/forward, Escape-to-close, `role="dialog"` + `aria-modal`,
focus trap, focus restoration and exact return to the originating grid position.

---

## 10. Accessibility and responsive behaviour

- Semantic HTML, skip link (first focusable element), visible keyboard focus.
- Minimum **320px** width with **no horizontal overflow** — E2E-verified across
  all 14 routes; manually verified at 320/390/768/1024/1280/1366/1440/1920.
- Correct modal semantics, focus management and focus restoration.
- Keyboard navigation for the tree (2D alternative is fully keyboard operable).
- Touch-friendly controls; swipe on the gallery; mobile uses the 2D tree.
- `prefers-reduced-motion` support: CSS neutralises transitions/animations,
  reveal content stays fully opaque, 3D scenes render one static frame. A
  reduced-motion WebGL crash was found and fixed (see §12).
- Loading and error states for 3D scenes; WebGL-unavailable fallback.
- Image alternatives on every asset; missing data labelled "Not published".
- `overflow-x: hidden` on body plus source-level fixes so nothing is clipped.

---

## 11. Test and verification results

### Automated

| Check | Result |
|---|---|
| `npm run typecheck` (`tsc --noEmit`) | **PASS** |
| `npm run lint` (ESLint) | **PASS** |
| `npm run build` | **PASS** — 25 static pages, compiled in 2.8s |
| `npm run test:e2e` (Playwright, Chromium) | **25 passed**, 0 failed (13.3s) |

E2E suites: `home.spec.ts` (hero, 10-scene order, nav, skip link, broken images,
reduced motion, 320px overflow across 14 routes), `robots.spec.ts` (grid,
overlay open/URL/ARIA, Escape + focus restore, back/forward, direct URL,
gallery/thumbnails, hotspots, rapid cycles), `tree.spec.ts` (searchable 3D / 2D
fallback, mobile 2D, relationship legend), `content.spec.ts` (subsystem anchors,
evidence filters/search, no-dataset policy, missing-measurement labels, research
honesty, timeline separation, asset manifest).

### Manual browser verification (production build, real Chromium)

- WebGL available; 3D tree renders **30 nodes** with organic curved branches,
  labels, toolbar and relationship legend; 7 labels visible in the home view;
  search returns matches (e.g. "mechanical" → 7); 2D switch works; mobile
  always uses `Tree2D`.
- Product overlay: open → `/robots/aegis`, `aria-modal=true`, focus on Close;
  gallery next `01/03 → 02/03`; hotspot panel opens; Escape → `/robots` and
  hidden; second card → `/robots/zugbee-x1`; browser back → closed; direct URL
  `/robots/aegis` → opens immediately. Zero page errors.
- Zero horizontal overflow and zero JS errors on 9 routes at 1440px and at
  320/390px.
- Reduced motion: `h1` present, full body content (~11.6k chars), all 30 reveal
  elements opaque, **zero page errors** in both reduced and normal modes.

### Defects found and fixed during this delivery

1. **Hero CTAs fell below the first viewport** at 1440×900 (bottom 919px vs
   900px). Fixed by height-aware `min(7.4vw, 11.5vh)` hero type, tighter hero
   spacing and a short-viewport media rule. Verified CTAs fit at all 8 tested
   desktop/mobile sizes (1440×900 bottom = 864px).
2. **Horizontal overflow at 320/390px** (130px / 60px) caused by
   `white-space: nowrap` technical badges with long discipline labels. Fixed
   with `max-width: 100%`, `white-space: normal`, `overflow-wrap: anywhere`.
   Verified zero overflow on all routes at 320px.
3. **Reduced-motion crash**: the reduced-motion value flipped after mount,
   tearing down and rebuilding a WebGL renderer on a force-lost canvas
   (`Cannot read properties of null (reading 'precision')`), which wiped the
   React tree. Fixed with a stable `useSyncExternalStore` hook, single-mount
   hero scene, live start/stop instead of renderer rebuild, and a defensive
   try/catch that keeps the essential hero photograph intact.
4. **Hotspot panel label mismatch**: clicking "6-DOF Manipulator" opened a panel
   titled only "Manipulation". The panel now shows the exact clicked hotspot
   label.
5. One ambiguous E2E selector (`.pg-rows` matched two containers) corrected to
   `.first()`.

---

## 12. Performance results

Production build (`next build`), served with `next start` on localhost.

**Bundle sizes:**

| Metric | Value |
|---|---|
| First Load JS shared by all | **103 kB** |
| Largest route First Load JS | **126 kB** (`/`) |
| Robot/Engineering/People routes | 113–117 kB |
| Simple subpages | 104–109 kB |

Three.js is code-split and lazy-loaded, so it is not part of the 103 kB shared
bundle. All 25 pages are static/SSG.

**Browser timing (1440×900, local production server, no network latency):**

| Route | DOMContentLoaded | Load | LCP | CLS | Resources | Transferred |
|---|---|---|---|---|---|---|
| `/` | 311 ms | 559 ms | 352 ms | 0.052 | 33 | 1,290 KB |
| `/robots` | 254 ms | 519 ms | 276 ms | 0.012 | 29 | 1,321 KB |
| `/people` | 286 ms | 523 ms | 296 ms | 0.014 | 32 | 1,665 KB |
| `/engineering` | 298 ms | 526 ms | 308 ms | 0.024 | 26 | 750 KB |
| `/research` | 272 ms | 508 ms | 288 ms | 0.007 | 26 | 532 KB |

Transferred sizes are dominated by authentic full-resolution photography.
LCP and CLS were captured with buffered `PerformanceObserver`s registered
before navigation (median of three cold-cache visits per route, after one
discarded warm-up navigation); raw numbers are in
`screenshots/performance.json`. These are local-loopback figures and should be
re-measured under real network conditions before publication.

**Runtime controls:** capped DPR, IntersectionObserver pause, reduced particle
counts on low-power devices, single-frame reduced-motion rendering, no
simultaneous scene loops, lazy 3D initialization.

---

## 13. Known limitations

1. **Blueprint PDF absent.** The brief's authoritative PDF was not present in
   the workspace; content was sourced from the crawled official-site snapshots
   in `.research/`. Any PDF-only requirements should be re-checked against the
   PDF when available.
2. **No authentic 3D rover model.** No authorized GLB/GLTF exists, so the
   photo-based product experience is intentionally complete without one.
3. **No validated numeric experiment datasets.** No charts are rendered; the
   evidence explorer states the no-dataset policy and labels every missing
   measurement.
4. **Individual member contributions are not published.** The tree shows
   hierarchy, team-level engineering relationships and one documented
   platform-to-platform influence only.
5. **Official-source inconsistency:** `projects.html` describes Zugbee X1 as a
   "Wheeled Rover / 4-Wheel Drive", while the recovered photographs show a
   tracked chassis. The text is transcribed verbatim from the official site and
   is **flagged for verification**; no correction was invented.
6. **Asset licensing** is not separately documented on the source site — confirm
   permission before commercial deployment.
7. **Facebook link** published on the official site is a shared-post URL, not a
   dedicated page; it is labelled `unverified`.
8. **Fonts** (Archivo, Inter, IBM Plex Mono, Source Serif 4) load from the
   Google Fonts CDN via `<link>` in `layout.tsx`. Self-host them if offline or
   strict-privacy deployment is required.
9. **Reduced-motion live toggle** on the 3D tree falls back to the 2D tree
   rather than rebuilding the renderer (deliberate, to avoid context-loss
   crashes); the hero depth layer start/stops its loop instead.
10. **Competition outcomes** are not claimed; RoboCup Rescue 2026 is presented
    as a target/planned participation only.
11. Timing figures are local-loopback measurements, not field data.

---

## 14. Deployment instructions

```bash
# 1. Install
npm ci

# 2. Verify locally
npm run typecheck
npm run lint
npm run build
npm run start          # http://localhost:3000

# 3. Browser tests (uses/reuses :3000)
npm run test:e2e
```

The build is fully static/SSG (no server runtime requirements), so it can be
deployed to any static host or Node host:

- **Vercel / Netlify / Cloudflare Pages:** import the repo, build command
  `npm run build`, output `.next` (Vercel auto-detects Next.js).
- **Self-hosted Node:** `npm ci && npm run build && npm run start` behind a
  reverse proxy on port 3000 (or set `PORT`).
- **Pure static export:** add `output: "export"` to `next.config.mjs` and run
  `npm run build`; the `out/` directory can be served by any CDN. All routes are
  prerendered, so this works, but re-validate the `/robots/[slug]` client-side
  history handling on your host's SPA fallback rules.

Before going live:

- Confirm asset permission/licensing (limitation 6).
- Self-host fonts if required (limitation 8).
- Re-measure performance under production network conditions.
- Re-check the flagged Zugbee X1 locomotion description (limitation 5) and any
  `unverified` claims against the official site.

---

## 15. Browser screenshots

Final screenshots (production build, real Chromium) in `screenshots/`:

| File | Content |
|---|---|
| `01-home-hero-1440.png` | Scene 01 hero, 1440×900 |
| `02-home-full.png` | Full ten-scene homepage |
| `03-home-mobile-390.png` | Mobile hero, 390×844 |
| `04-robots-grid.png` | Robot Universe product grid |
| `05-product-overlay-aegis.png` | Full-screen AEGIS product overlay |
| `06-engineering-tree-3d.png` | Interactive 3D Engineering Tree |
| `07-tree-2d-mobile.png` | Accessible 2D tree on mobile |
| `performance.json` | Raw navigation-timing, LCP/CLS and resource-transfer data (median of 3 cold-cache visits) |
