# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- **Electron Forge** (`@electron-forge/cli`) — app packaging/build orchestration, driven by [forge.config.ts](forge.config.ts)
- **Webpack** via `@electron-forge/plugin-webpack` — bundles main, preload, and renderer separately (configs: [webpack.main.config.ts](webpack.main.config.ts), [webpack.renderer.config.ts](webpack.renderer.config.ts), shared [webpack.rules.ts](webpack.rules.ts) / [webpack.plugins.ts](webpack.plugins.ts))
- **TypeScript** (^5.9) — compiled via `ts-loader` (`transpileOnly: true`); type errors surface separately via `fork-ts-checker-webpack-plugin` during webpack builds, and via `npm run typecheck` on demand
- **React 19** + **react-router-dom 7** — renderer UI, using `HashRouter` (required since the renderer loads via `file://` in packaged builds, not an HTTP origin)
- **Tailwind CSS v4** — via `@tailwindcss/postcss`, no `tailwind.config.js` (v4 default); loaded through `postcss-loader` in the CSS webpack rule
- **Font Awesome** — `@fortawesome/react-fontawesome` + `fontawesome-svg-core` and the `free-solid`/`free-regular`/`free-brands` icon packs
- **ESLint 8** with `@typescript-eslint`, `eslint-plugin-import`, `eslint-plugin-react`, `eslint-plugin-react-hooks`

## Commands

- `npm start` — launch the app in dev mode (Electron Forge + webpack dev server, hot reload)
- `npm run lint` — lint `.ts`/`.tsx` files under the repo root (`eslint --ext .ts,.tsx .`)
- `npm run typecheck` — type-check the whole project without emitting (`tsc --noEmit`)
- `npm run package` — build the app without producing installers
- `npm run make` — build platform installers/distributables (Squirrel, ZIP, deb, rpm depending on OS)
- `npm run publish` — run configured Forge publishers

There is no test runner configured in this repo. **Every change must be verified to compile** — run `npm run typecheck` (and `npm run lint`) before considering a change done.

## Architecture

Electron Forge's webpack plugin builds three separate bundles from one `forge.config.ts` entry-point declaration (main process, preload script, renderer), each with its own webpack config:

- **Main process** — [src/index.ts](src/index.ts). Creates the `BrowserWindow` and loads the renderer via the Forge-injected globals `MAIN_WINDOW_WEBPACK_ENTRY` and `MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY` (declared as ambient `const`s, not real imports — don't try to resolve them as modules).
- **Preload** — [src/preload.ts](src/preload.ts). Currently empty; this is where `contextBridge` APIs would be exposed to the renderer.
- **Renderer** — [src/renderer.tsx](src/renderer.tsx) is the webpack entry for the `main_window`. It mounts React (`createRoot`) into `#root` (defined in [src/index.html](src/index.html)) and renders [src/routes.tsx](src/routes.tsx), which is the app's routing root (`HashRouter` + `<Routes>`). Add new pages as components and register them as `<Route>` entries in `routes.tsx`; `/` maps to [src/Home.tsx](src/Home.tsx) as the default page.

`webpack.rules.ts` is shared between the main and renderer configs; the renderer config ([webpack.renderer.config.ts](webpack.renderer.config.ts)) additionally appends the CSS rule (`style-loader` → `css-loader` → `postcss-loader`, the latter running Tailwind). `.ts`/`.tsx` files are both handled by the same `ts-loader` rule (`test: /\.tsx?$/`).

`tsconfig.json` sets `"jsx": "react-jsx"` (no need to import `React` for JSX, though existing files still do) and has no `strict` mode enabled.

## Frontend design conventions

The frontend is organized combining **Atomic Design** (component granularity), **Hexagonal Architecture** (domain/application/infrastructure separation), and **MVVM** (View/ViewModel/Model separation) per feature:

- **MVVM mapping**: components (`ui/`, atoms through pages) are the **View** — presentational only, no logic. Hooks (`useX` in `application/` or `shared`) are the **ViewModel** — they hold UI state, call use cases/services, and expose data + handlers to the View, but contain no rendering. `domain/` entities plus `application/` use cases and `infrastructure/services/` are the **Model** — business rules and data access. A View must never call a use case, service, or the Model directly; it only consumes a ViewModel hook.
- Each feature lives under its own folder with `domain/` (entities, port interfaces), `application/` (use cases), `infrastructure/` (adapters: storage, etc.) with a `services/` subfolder for that feature's HTTP requests, and a `ui/` layer split by atomic-design tier (`atoms/`, `molecules/`, `organisms/`, `templates/`, pages).
- Any atom/molecule/organism/template (or domain/infrastructure code) used by more than one feature belongs in a top-level `shared/` folder, mirroring the same atomic-design tiers, instead of living inside a single feature.
- Routes registered in [src/routes.tsx](src/routes.tsx) should map to feature pages, not contain business logic themselves.
- UI components (atoms through pages, in `shared/` or in a feature) must stay presentational: no business logic and no HTTP/data-fetching calls inside a component. Components only receive props and render.
- The only way a component communicates with logic/data is through hooks (e.g. `useX` in `application/` or `shared`), which wrap use cases and service calls. Fetching, side effects, and business rules live in hooks, not in components.
- All HTTP requests live exclusively in `services/` folders (one per feature, plus `shared/services/` for cross-feature ones) — never inline in a hook, component, or use case. Hooks call `services/` functions, not `fetch`/`axios` directly.
- All `types`/`interfaces` live in `shared/` (e.g. `shared/types/`), never declared locally inside a feature — features import types from `shared` instead of defining their own.
- Code must follow **DRY** (extract and reuse via `shared/` rather than duplicating logic/components/types across features) and **SOLID** (each hook/use case/service/component has a single responsibility, depend on the `domain/` port interfaces rather than concrete implementations, and prefer composition/extension over modifying existing abstractions).
- Complex object construction (entities, request payloads, configuration objects) uses the **Builder** pattern rather than large constructors or option bags built inline.
- Visual theme/style is always **dark deep-purple with pastel/colorful accents** (a rich violet/purple dark base, kept lively via colorful gradient accents — not a flat gray/black dark mode) — avoid stark/monochrome/high-contrast corporate styling.
- Stick to a single, consistent UI design style across the whole app (spacing scale, border radii, shadows, component shapes) — do not mix different UI design styles (e.g. flat, glassmorphism, neumorphism, skeuomorphism) between screens or components.
- **Established style guide** (set by the chat UI in `features/chat/` and `shared/ui/`, reuse these for any new screen):
  - **Palette**: deep-purple dark base (`violet-950`/`purple-950`/`indigo-950`) for the app background and translucent surfaces (`violet-900/40`–`/70`, `violet-800/50` for borders), with light violet text (`violet-50`/`100` for headings/primary text, `violet-300`/`400` for secondary/placeholder text). Accents/CTAs and the user's chat bubble use a vivid gradient (`bg-gradient-to-br from-violet-400 to-pink-400` or `from-violet-500 to-pink-500`); the assistant role uses a distinct secondary accent (`from-pink-400 to-orange-300`) for its avatar while its bubble stays a flat dark surface (`bg-violet-900/70`); a low-opacity blue tint (`bg-blue-500/10 text-blue-300`) is used for informational pills (e.g. the model-router badge). Never use plain white/light backgrounds for app surfaces — only for content sitting on top of dark surfaces if strictly needed. The **navbar is the one exception to translucency**: it must stay a fully opaque solid `bg-violet-950` (hex `#2e1065`) with no `backdrop-blur`, because on Windows its top edge sits directly under the native title-bar overlay (`MainWindowOptionsBuilder`'s `TITLE_BAR_BACKGROUND`) and must match that color exactly — any transparency or blur there creates a visible seam against the native window controls.
  - **Shape**: rounded corners everywhere — `rounded-2xl`/`rounded-3xl` for cards, bubbles, buttons, and input fields; `rounded-full` for avatars/icon badges and pill labels.
  - **Depth**: flat design with soft `shadow-sm` only — no heavy shadows, no glassmorphism/neumorphism blur effects (aside from `backdrop-blur-sm` on translucent surfaces like the input bar — not the navbar, see above).
  - **Spacing**: `p-4`/`p-6` for containers, `gap-2`/`gap-3`/`gap-4` between elements, `px-4 py-2.5` for buttons/inputs/pills.
  - **Typography**: `text-sm` as the base body size, `text-xs` for secondary/meta text, `font-semibold`/`font-medium` for emphasis — no bold headline sizes outside the navbar title.
  - **Icons**: Font Awesome solid icons (`free-solid-svg-icons`) sized `h-3.5 w-3.5` (inline/small) or `h-4 w-4` (buttons/badges), always wrapped in a colored rounded badge/button rather than used bare.
- One component per file — never declare more than one component in a single file, regardless of atomic-design tier.
- No standalone/loose functions — use cases, services, domain logic, and any other non-UI code must be encapsulated as class methods rather than exported bare functions. The only exceptions are UI components (which stay function components) and hooks (which must stay plain functions per the Rules of Hooks — a hook may internally delegate to a class's methods, but the exported `useX` itself is not a class method).
- One class per file — never declare more than one class in a single file, same as the one-component-per-file rule above.

## Main process design conventions

The main (Node.js) process — [src/index.ts](src/index.ts) and anything added alongside it — also uses the **Builder** pattern for constructing complex objects, e.g. `BrowserWindow` options, menu templates, or other multi-step configuration, instead of assembling large literals inline.

All IPC handlers (`ipcMain.handle`/`ipcMain.on`) live under a top-level `handles/` folder, one subfolder per domain, one file per action (single responsibility) — never multiple handlers grouped in one file. Example for an "articles" CRUD:

```
handles/
  articles/
    create.ts
    read.ts
    update.ts
    delete.ts
```

Each action file registers only its own `ipcMain` channel and delegates the actual work to `application`/`domain`/`services` code rather than implementing business logic inline.

Same rule as the frontend: no standalone/loose functions in main-process code — encapsulate use cases, domain logic, and services as class methods rather than exported bare functions. The exception is the `handles/` registration files themselves: the callback passed to `ipcMain.handle` stays a plain function (delegating to a class's methods for the actual work), matching the hooks exception on the frontend.

All IPC communication must follow Electron's **"Pattern 2: Renderer to main (two-way)"**: main registers each channel with `ipcMain.handle(channel, ...)` (one per file in `handles/`) and the renderer calls it with `ipcRenderer.invoke(channel, ...)` (exposed to the renderer via `contextBridge` in [src/preload.ts](src/preload.ts)). Do not use the one-way `ipcRenderer.send` / `ipcMain.on` pattern for renderer→main calls.

## Keeping this file up to date

**Any change to the architecture or design conventions above (new folder convention, new pattern, new layer, etc.) must be added to this file as part of that same change** — this document must always reflect the current architecture, not a past snapshot.
