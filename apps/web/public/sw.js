// Minimal service worker for UBB Campus (TODO-23).
// It only makes the app installable and shows offline.html when the network
// is down. It never caches pages or data.

// Bump the version whenever PRECACHE or offline.html changes, so old caches get deleted.
const CACHE_NAME = "ubb-campus-shell-v1";

const PRECACHE = [
  "/offline.html",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
  "/icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never intercept or cache /api/*: a stale room status is worse than none
  // (TODO-23, CLAUDE.md §3.4). Status is computed at read time from the
  // timetable and live check-ins, so an old response would show a room as
  // free or occupied when it no longer is. Let the browser hit the network.
  if (url.pathname.startsWith("/api/")) return;

  // Pages: network first. offline.html only when the network fails. Pages are
  // never stored, because they render room status too.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match("/offline.html").then((cached) => cached || Response.error()),
      ),
    );
    return;
  }

  // Precached shell files: cache first, then network.
  if (PRECACHE.includes(url.pathname)) {
    event.respondWith(caches.match(request).then((cached) => cached || fetch(request)));
    return;
  }

  // Everything else (/_next/, RSC payloads, ...) goes straight to the network.
});
