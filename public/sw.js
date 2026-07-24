const CACHE_NAME = 'nkg-math-v2';
const BASE_PATH = '/NKG-MATH';

// Files to cache for offline use
const STATIC_ASSETS = [
  BASE_PATH + '/',
  BASE_PATH + '/tables',
  BASE_PATH + '/formulas',
  BASE_PATH + '/squares-cubes',
  BASE_PATH + '/definitions',
  BASE_PATH + '/classes',
  BASE_PATH + '/games',
  BASE_PATH + '/quiz',
  BASE_PATH + '/daily-challenge',
  BASE_PATH + '/workbook',
  BASE_PATH + '/general-math',
  BASE_PATH + '/manifest.json',
  BASE_PATH + '/index.html',
];

// Install event - cache all static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip API requests - always go to network
  if (event.request.url.includes('/api/')) return;

  // 🔥 NAYA RULE: Ads aur Analytics ko cache se bilkul alag rakhein
  if (
    event.request.url.includes('pagead2.googlesyndication.com') || 
    event.request.url.includes('googleads') ||
    event.request.url.includes('doubleclick.net')
  ) {
    return; // Seedhe network se aane do, cache mat karo
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached version, also update cache in background
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(() => {});
        return cachedResponse;
      }

      // Not in cache - try network
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }
        // Cache the new response
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Offline and not cached - return index.html for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match(BASE_PATH + '/index.html');
        }
      });
    })
  );
});
