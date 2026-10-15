# WORLDFORGE — Front-end upgrade

A responsive, Minecraft-inspired community portal prototype for discovering mods, browsing sample server listings, exploring build ideas, and playing a local crafting mini-game.

## Included
- `index.html` — complete page structure and separated portal panels.
- `styles.css` — responsive design, pixel-inspired UI, transitions, hover states, particles, and theme variations.
- `app.js` — Persian/English language toggle, mod/server/build filters, 100+ recipe index (including wood variants), free crafting and timed challenge, local XP/Coins/achievements/daily quest, sound toggle, and demo server listing form.
- `assets/favicon.svg` — site icon.

## Publish on GitHub Pages
1. Upload/replace `index.html`, `styles.css`, and `app.js` in the repository root.
2. Upload the `assets` folder too (it contains `favicon.svg`).
3. Keep the filenames exactly as shown, especially `index.html`.
4. Wait for GitHub Pages to redeploy, then refresh the website.

## Important limitations
- This is a static front-end. Community chat is a visual preview and does not send messages.
- Server cards are sample/demo listings, not live or verified server-status data.
- The server submission form saves only to the current browser's local storage; it does not send requests to an administrator.
- XP, coins, achievements, and leaderboard are local demo data and can be reset or edited by the visitor. They are not secure accounts or a global leaderboard.
- Mod links lead to project pages; compatibility and current versions should be checked there. Some mod/resource-pack availability depends on Minecraft edition, version, and loader.
- The recipe book includes 100+ indexed recipe entries with variants. As with any recipe catalogue, verify exact recipes against the Minecraft version you play; this static prototype is not an official Minecraft client or a Mojang/Microsoft product.
- Google Fonts is used for the pixel title font and Persian font when an internet connection is available; fallback fonts remain defined.

## Next step for real community features
A backend, user authentication, database, moderation tools, and a real-time messaging service are required for real accounts, server submissions, verified server status, global leaderboards, and Discord-like live chat.

Minecraft is a trademark of Mojang Studios/Microsoft. WORLDFORGE is an independent, unofficial fan project.
