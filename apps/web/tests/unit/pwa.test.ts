import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// apps/web, resolved from this file so the test does not depend on the cwd.
const webRoot = fileURLToPath(new URL("../../", import.meta.url));
const publicDir = join(webRoot, "public");

type ManifestIcon = { src: string; sizes: string; type: string; purpose?: string };
type Manifest = {
  start_url: string;
  display: string;
  theme_color: string;
  icons: ManifestIcon[];
};

const manifest = JSON.parse(
  readFileSync(join(publicDir, "manifest.webmanifest"), "utf8"),
) as Manifest;

// PNG: 8-byte signature, then the IHDR chunk; width and height are bytes 16..23.
function pngSize(file: string): { width: number; height: number } {
  const buf = readFileSync(file);
  expect(buf.subarray(0, 8)).toEqual(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  expect(buf.toString("ascii", 12, 16)).toBe("IHDR");
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

describe("web app manifest", () => {
  it("opens standalone on /rooms", () => {
    expect(manifest.start_url).toBe("/rooms");
    expect(manifest.display).toBe("standalone");
  });

  it("has 192, 512 and maskable icons", () => {
    const sizes = manifest.icons.map((icon) => icon.sizes);
    expect(sizes).toContain("192x192");
    expect(sizes).toContain("512x512");
    expect(manifest.icons.some((icon) => icon.purpose === "maskable")).toBe(true);
  });

  it.each(manifest.icons.map((icon) => [icon.src, icon] as const))(
    "%s exists and is a PNG of the declared size",
    (_src, icon) => {
      const file = join(publicDir, icon.src);
      expect(existsSync(file)).toBe(true);
      expect(icon.type).toBe("image/png");
      const [width, height] = icon.sizes.split("x").map(Number);
      expect(pngSize(file)).toEqual({ width, height });
    },
  );

  it("apple-touch-icon is a 180x180 PNG", () => {
    expect(pngSize(join(publicDir, "icons/apple-touch-icon.png"))).toEqual({
      width: 180,
      height: 180,
    });
  });

  it("theme_color matches viewport.themeColor in the root layout", () => {
    // Compared as text so the test does not import globals.css.
    const layout = readFileSync(join(webRoot, "app/layout.tsx"), "utf8");
    const match = layout.match(/themeColor:\s*"([^"]+)"/);
    expect(match?.[1]).toBe(manifest.theme_color);
  });
});

describe("offline page", () => {
  it("shows the exact offline message", () => {
    const html = readFileSync(join(publicDir, "offline.html"), "utf8");
    expect(html).toContain("Nu ai conexiune. Starea sălilor nu poate fi verificată acum.");
    expect(html).not.toContain("/_next/");
  });
});

describe("service worker", () => {
  const sw = readFileSync(join(publicDir, "sw.js"), "utf8");

  it("never handles /api/ requests", () => {
    expect(sw).toMatch(/url\.pathname\.startsWith\("\/api\/"\)\)\s*return;/);
  });

  it("never writes to the cache outside install", () => {
    expect(sw).not.toContain("cache.put");
    expect(sw).not.toContain(".put(");
  });
});
