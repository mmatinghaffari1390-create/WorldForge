# WORLDFORGE — pre-release QA checklist

This checklist is for the safe redesign branch `redesign-v2`. It does not imply that all manual browser checks have already passed.

## Automated/source checks
- [x] Parse `app.js` with JavaScript syntax validation (`new Function`): passed.
- [x] Confirm all redesigned HTML pages link to the shared styles/scripts: passed in the source audit; rerun after further edits.
- [x] Confirm local navigation targets exist: passed (including `assets/favicon.svg`).
- [x] Confirm no duplicate IDs in the audited HTML pages: passed in the source audit; rerun after further edits.
- [x] At the initial audit, `redesign-v2` was 44 commits ahead of `main` and 0 behind; no writes were made to `main`. Recheck branch comparison before release.
- [x] No files have been deleted in this work. The redesign branch contains added and modified files; review the compare view before release.
- [x] Check CSS curly-brace balance: passed.

## Manual browser checks before publishing

These require an actual browser session and have **not** been claimed as passed.
- [ ] Open home, servers, mods, gallery, crafting, community, account, shop, leaderboard, and docs pages.
- [ ] Test narrow mobile width and desktop width; check for horizontal overflow.
- [ ] Test Persian/English switch on every page and check RTL/LTR layout.
- [ ] Test dark/light theme and refresh persistence.
- [ ] Test mobile navigation open/close and current-page indication.
- [ ] Test home portal search with matching and non-matching terms.
- [ ] Test keyboard focus, skip link, and reduced-motion preference.
- [ ] Check console for runtime errors and network failures.
- [ ] Verify external image/font availability and fallback behavior.

## Release gates
- Do not publish or merge until automated checks and manual browser checks are complete.
- Live server status, accounts/authentication, checkout, community posting, and authoritative recipe/mod data require trusted backends or reviewed datasets; UI previews must not be presented as live functionality.


## Visual redesign follow-up (2026-10-16)
- [x] Added a cinematic multiplayer-network section with three illustrated mode cards and navigation to existing pages.
- [x] Refreshed the global palette and hero treatment toward a dark, high-contrast Minecraft server-network aesthetic.
- [x] Clearly labeled server/live status as not connected; no fabricated player counts or live uptime.
- [x] Added shared module-page styling and filtering/empty-state logic for the redesigned module pages.
- [x] Updated `sitemap.xml` to include account, leaderboard, shop, crafting, and docs pages.
- [ ] Manual browser visual checks at mobile and desktop sizes remain required before release.
- [ ] Verify contrast, keyboard focus, reduced-motion behavior, and all routes on the deployed preview.
