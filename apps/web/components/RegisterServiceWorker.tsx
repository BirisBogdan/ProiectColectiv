"use client";

import { useEffect } from "react";

// Registers public/sw.js in production only. In development a service worker
// would serve stale assets and fight with hot reload.
export function RegisterServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .catch((error: unknown) => {
        console.error("Service worker registration failed:", error);
      });
  }, []);

  return null;
}
