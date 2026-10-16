/* Small, versioned offline shell. Navigation is network-first to avoid stale pages. */
const CACHE = 'worldforge-shell-v6';
const CORE = ['./', './index.html', './styles.css', './app.js', './enhancement.js', './enhancement.css', './forge-theme.css', './manifest.webmanifest', './mods.html', './servers.html', './gallery.html', './games.html', './community.html', './progress.html', './account.html', './account.css', './account.js', './assets/favicon.svg', './assets/worldforge-emblem.svg'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).then(response => {
      if (response.ok) caches.open(CACHE).then(cache => cache.put(req, response.clone()));
      return response;
    }).catch(async () => (await caches.match(req)) || (await caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(req).then(cached => {
    if (cached) return cached;
    return fetch(req).then(response => {
      if (response.ok && response.type === 'basic') caches.open(CACHE).then(cache => cache.put(req, response.clone()));
      return response;
    });
  }));
});