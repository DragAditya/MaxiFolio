/* Portfolio offline cache: app-shell fallback plus stale-while-revalidate delivery for visual assets. */
const CACHE_NAME = "aditya-portfolio-offline-v3";
const CORE_ASSETS = [
  "/",
  "/manus-storage/aditya-hero-768_a0773e1b.webp",
  "/manus-storage/aditya-hero-1200_db631a3c.webp",
  "/manus-storage/aditya-alter-560_92ea5cb8.webp",
  "/manus-storage/aditya-alter-960_127d50dd.webp",
  "/manus-storage/aditya-dragx-560_ef4c3853.webp",
  "/manus-storage/aditya-dragx-960_586a160b.webp",
  "/manus-storage/aditya-peerlock-560_1f3dc625.webp",
  "/manus-storage/aditya-peerlock-960_7026cdd2.webp",
  "/manus-storage/aditya-maximal-aw-sticker_6f1e066f.png",
];

async function putIfSuccessful(cache, request, response) {
  if (response && response.ok) await cache.put(request, response.clone());
  return response;
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(CORE_ASSETS.map(async (asset) => {
      try { await putIfSuccessful(cache, asset, await fetch(asset, { cache: "reload" })); } catch { /* Leave a failed asset uncached rather than preventing activation. */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith("aditya-portfolio-") && key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try { return await putIfSuccessful(cache, request, await fetch(request)); }
  catch { return (await cache.match(request)) || (await cache.match("/")); }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const network = fetch(request).then((response) => putIfSuccessful(cache, request, response)).catch(() => undefined);
  return cached || (await network) || Response.error();
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/__manus__/")) return;
  if (request.mode === "navigate") { event.respondWith(networkFirst(request)); return; }
  if (url.pathname.startsWith("/manus-storage/") || ["image", "font", "style", "script"].includes(request.destination)) event.respondWith(staleWhileRevalidate(request));
});
