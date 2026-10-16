# WORLDFORGE — pre-release QA checklist

This checklist is for the safe redesign branch `redesign-v2`. It does not imply that all manual browser checks have already passed.

## Automated/source checks
- [ ] Parse `app.js` with a JavaScript syntax checker.
- [ ] Confirm each HTML page links to `styles.css` and `app.js`.
- [ ] Confirm all local navigation targets exist.
- [ ] Confirm there are no duplicate IDs in each HTML page.
- [ ] Confirm no tracked files were deleted in this change.
- [ ] Confirm the `main` branch head is unchanged.

## Manual browser checks before publishing
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
