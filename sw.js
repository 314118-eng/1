const CACHE_NAME = 'bus-app-cache-v1';
const urlsToCache = [
  './3.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 安裝 Service Worker 並快取檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截網路請求，若斷網則從快取讀取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果快取裡有，就回傳快取；如果沒有，就去網路抓
        return response || fetch(event.request);
      })
  );
});
