const cacheName = "arabic-typing-master-v1";

// Add new routes to assets array to make sure it is available offline.
const assets = [
  "./",
  "./index.html",
  "./app-1.0.css",
  "./app-1.0.js",
  "./arabic-keyboard-mac.png",
  "./logo.gif",
  "./jquery-3.4.1.min.js",
  "./bootstrap-4.3.1-dist/css/bootstrap-grid.css",
  "./bootstrap-4.3.1-dist/css/bootstrap-grid.css.map",
  "./bootstrap-4.3.1-dist/css/bootstrap-grid.min.css",
  "./bootstrap-4.3.1-dist/css/bootstrap-grid.min.css.map",
  "./bootstrap-4.3.1-dist/css/bootstrap-reboot.css",
  "./bootstrap-4.3.1-dist/css/bootstrap-reboot.css.map",
  "./bootstrap-4.3.1-dist/css/bootstrap-reboot.min.css",
  "./bootstrap-4.3.1-dist/css/bootstrap-reboot.min.css.map",
  "./bootstrap-4.3.1-dist/css/bootstrap.css",
  "./bootstrap-4.3.1-dist/css/bootstrap.css.map",
  "./bootstrap-4.3.1-dist/css/bootstrap.min.css",
  "./bootstrap-4.3.1-dist/css/bootstrap.min.css.map",
  "./bootstrap-4.3.1-dist/js/bootstrap.bundle.js",
  "./bootstrap-4.3.1-dist/js/bootstrap.bundle.js.map",
  "./bootstrap-4.3.1-dist/js/bootstrap.bundle.min.js",
  "./bootstrap-4.3.1-dist/js/bootstrap.bundle.min.js.map",
  "./bootstrap-4.3.1-dist/js/bootstrap.js",
  "./bootstrap-4.3.1-dist/js/bootstrap.js.map",
  "./bootstrap-4.3.1-dist/js/bootstrap.min.js",
  "./bootstrap-4.3.1-dist/js/bootstrap.min.js.map",
  "./index.html",
  "./jquery-3.4.1.min.js",
  "./level1/lesson1.html",
  "./level1/lesson2.html",
  "./level1/lesson3.html",
  "./level1/lesson4.html",
  "./level1/lesson5.html",
  "./level1/lesson6.html",
  "./level2/lesson1.html",
  "./level2/lesson2.html",
  "./level2/lesson3.html",
  "./level2/lesson4.html",
  "./level3/lesson1.html",
  "./level3/lesson2.html",
  "./level3/lesson3.html",
  "./level3/lesson4.html",
  "./level3/lesson5.html",
  "./level3/lesson6.html",
  "./level3/lesson7.html",
  "./level4/lesson1.html",
  "./level4/lesson2.html",
  "./level4/lesson3.html",
  "./level4/lesson4.html",
  "./level5/lesson1.html",
  "./level5/lesson2.html",
  "./level5/lesson3.html",
  "./level5/lesson4.html",
  "./level5/lesson5.html",
  "./level5/lesson6.html",
  "./level6/lesson1.html",
  "./level6/lesson2.html",
  "./level6/lesson3.html",
  "./level6/lesson4.html",
  "./level6/lesson5.html",
  "./level6/lesson6.html",
  "./level6/lesson7.html",
  "./level7/lesson1.html",
  "./level7/lesson2.html",
  "./level7/lesson3.html",
  "./level7/lesson4.html",
  "./level7/lesson5.html",
  "./level7/lesson6.html",
  "./level8/lesson1.html",
  "./level8/lesson2.html",
  "./level9/lesson1.html",
  "./level9/lesson2.html",
  "./level9/lesson3.html",
  "./level9/lesson4.html",
  "./level9/lesson5.html",
  "./level9/lesson6.html",
  "./level9/lesson7.html",
  "./level9/lesson8.html",
  "./level9/lesson9.html",
  "./level9/lesson10.html",
  "./level9/lesson11.html",
  "./level9/lesson12.html",
  "./level10/lesson1.html",
  "./level10/lesson2.html",
  "./level10/lesson3.html",
  "./level10/lesson4.html"
];

self.addEventListener("install", async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(assets);
  return self.skipWaiting();
});

self.addEventListener("activate", e => {
  self.clients.claim();
});

self.addEventListener("fetch", async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
