const CACHE = 'ral-electric-v5';
const FILES = [
  '/Ral-electric/',
  '/Ral-electric/index.html',
  '/Ral-electric/Ral.html',
  '/Ral-electric/manifest.json',
  '/Ral-electric/icon-192.png',
  '/Ral-electric/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
