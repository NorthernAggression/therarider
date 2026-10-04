// TheraRider service worker — enables installability and basic offline use.
// Caches the app shell; Firestore data still needs a network connection to sync.
var CACHE_NAME = 'therarider-v1';
var ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // Network-first for Firestore/Google requests (never cache live data);
  // cache-first for same-origin app files so the shell loads offline.
  var url = e.request.url;
  if (url.indexOf(self.location.origin) !== 0) return; // let cross-origin (Firebase, fonts, etc.) pass through normally

  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(resp) {
        var copy = resp.clone();
        caches.open(CACHE_NAME).then(function(cache) { cache.put(e.request, copy); });
        return resp;
      }).catch(function() {
        return cached;
      });
    })
  );
});
