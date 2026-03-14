const CACHE_NAME = 'mole-game-v1';
const assetsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// 安裝 Service Worker 並快取檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
});

// 攔截網頁請求，如果快取有就直接給快取（支援離線）
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});