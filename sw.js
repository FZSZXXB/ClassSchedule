var cacheStorageKey = 'classSchedule-v2.0'

var cacheList = [
  '/',
  "index.html",
  "/assets/css/index.css",
  "/assets/imgs/loading.svg",
  // "/assets/imgs/icon.png",
  "/assets/scripts/data.js",
  "/assets/scripts/main.js",
  "/assets/scripts/Timetable.js"
]

  self.addEventListener('install', function(e) {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(cacheStorageKey).then(function(cache) {
        console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(cacheList);
      })
    );
  });
  self.addEventListener('activate', function(e) {
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if(cacheStorageKey.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    );
  });

  self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(r) {
        console.log('[Service Worker] Fetching resource: '+e.request.url);
        return r || fetch(e.request).then(function(response) {
          return caches.open(cacheStorageKey).then(function(cache) {
            console.log('[Service Worker] Caching new resource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
  });