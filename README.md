# WORLDFORGE — Minecraft Community Portal

A Persian/English, responsive Minecraft-inspired portal prototype with separate destination pages, a crafting mini-game, curated mod links, build inspiration, and locally saved player progress.

## Experience map

- `index.html` — landing page and portal hub.
- `mods.html` — searchable and filterable mod/resource directory.
- `servers.html` — sample server listings and local-only listing request form.
- `gallery.html` — build inspiration and category filters.
- `games.html` — crafting workbench, recipe index, and timed challenge.
- `community.html` — community feature preview.
- `progress.html` — local XP, achievements, and player milestones.
- `styles.css` — responsive design system, motion, focus states, and reduced-motion support.
- `app.js` — core UI, language toggle, recipe/game logic, filters, and local persistence.
- `enhancement.js` — keyboard command palette (Ctrl/Cmd+K), scroll progress, back-to-top control, and progressive reveal animations.
- `manifest.webmanifest` and `sw.js` — install metadata and a small versioned offline shell for supported browsers.
- `sitemap.xml` and `robots.txt` — basic crawl metadata.
- `.github/workflows/validate-site.yml` — automated JavaScript, manifest, page-shell, and local-link checks on pushes and pull requests.
- `assets/` — site emblem and favicon.

## Run locally

Serve the repository root using any static HTTP server. Opening HTML directly with `file://` may disable service-worker features. GitHub Pages serves the project from its repository subpath, so internal asset and page URLs are intentionally relative.

## Publish on GitHub Pages

Publish the repository root. Keep all HTML, CSS, JavaScript, manifest, service worker, sitemap, robots file, and the `assets/` folder in their existing relative locations. After publishing changes, hard-refresh once if the browser has an older cached version.

## Honest scope and limitations

- This is a static front-end prototype; it does not have a server-side database or authentication.
- Community chat is a visual preview and does not send messages.
- Server cards are sample listings, not live or verified server-status data. No server IP is invented.
- The server submission form saves only in the current browser's local storage; it does not reach an administrator.
- XP, coins, achievements, and progress are local demo data, not a secure account or global leaderboard.
- Mod links lead to project pages. Check the Minecraft version and mod loader compatibility on each official project page.
- The recipe index is a learning aid; verify exact recipes against the game version you play.
- Fonts load from Google Fonts when available; fallback fonts are defined.
- Offline behavior depends on browser service-worker support and a successful first online visit.

## For a real production community

Real accounts, moderated chat, verified server status, global leaderboards, and submissions require a backend, database, authentication, abuse controls, and server-side validation.

Minecraft is a trademark of Mojang Studios/Microsoft. WORLDFORGE is an independent, unofficial fan project.
