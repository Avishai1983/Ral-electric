const CACHE = 'ral-v1';
const FILES = [
  '/Ral-electric/',
  '/Ral-electric/index.html',
  '/Ral-electric/Ral.html',
  '/Ral-electric/icon-ral.svg',
  '/Ral-electric/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
