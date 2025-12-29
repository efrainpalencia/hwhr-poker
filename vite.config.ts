import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

const PROD_BASE = "/rb/9-24-24-x7k3p/";

// NOTE: Your icons MUST be real 192/512 PNGs in /public/icons/
// e.g. public/icons/icon-192.png, public/icons/icon-512.png
export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  const base = isProd ? PROD_BASE : "/";

  return {
    base, // critical for Vercel subpath deploy (fixes /assets 404 + SW precache mismatch)

    plugins: [
      react(),
      tailwindcss(),

      VitePWA({
        registerType: "autoUpdate",

        // Only include files that actually exist in /public
        // If your logo is in /public/assets/images/seminole-logo.jpg, this is correct.
        includeAssets: [
          "assets/images/seminole-logo.jpg",
          "assets/images/poker-table.png",
          "icons/seminole-logo.png"
        ],

        manifest: {
          name: "Poker Rules",
          short_name: "Poker Rules",
          description: "Internal poker rules reference",
          theme_color: "#0f172a",
          background_color: "#ffffff",
          display: "standalone",

          // Must match your deployed base path
          start_url: base,
          scope: base,

          // Use proper PNG icons (NOT the jpg logo)
          icons: [
            { src: `${base}icons/seminole-logo.png`, sizes: "67x65", type: "image/png" },
          ],
        },

        workbox: {
          // ✅ MUST match the built base (precache contains `${base}index.html`)
          navigateFallback: `${base}index.html`,

          // ✅ Don’t hijack API/JSON/static assets
          navigateFallbackDenylist: [
            /^\/api\//,
            /^\/rules\//,
            /^\/assets\//,
            /^\/icons\//,
          ],

          runtimeCaching: [
            {
              urlPattern: ({ url }) =>
                url.pathname.startsWith("/rules/") && url.pathname.endsWith(".json"),
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "rules-json",
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
          ],
        },
      }),
    ],
  };
});
