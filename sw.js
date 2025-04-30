// sw.js
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        return caches.open('v1').then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    }).catch(() => fetch(event.request))
  );
});