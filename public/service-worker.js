const CACHE_NAME = "RDRIVE";

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll([
          '/favicon.ico',
          '/offline.png',
          '/offline-bg-light.svg',
          '/offline-bg-dark.svg',
          '/no-signal.png',
          '/404.png',
          '/no-img.png',
          '/icons/512.png',
          '/hold-on-baby.png',
          '/offline.html',
          '/Hello.json',
          '/Searh-Item.json',
          '/NoSearch.json',
          '/Loader.json',
          '/Upload.json',
          '/NotFound.json'
        ]);
      })
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, networkResponse.clone());

          return networkResponse;
        } catch (error) {
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match('/offline.html');

          return cachedResponse;
        }
      })()
    );
  } else {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(request);
          cache.put(request, networkResponse.clone());

          return networkResponse;
        } catch (error) {
          console.log("Fetch failed; returning offline asset instead.", error);

          if (/\.png$/.test(request.url)) {
            return cache.match('/icons/ghost/400.png');
          }
          return new Response('', { status: 404, statusText: 'Not Found' });
        }
      })()
    );
  }
});
