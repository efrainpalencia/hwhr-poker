import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",

      includeAssets: ["assets/images/seminole-logo.jpg", "assets/images/seminole-logo.jpg"],

      manifest: {
        name: "Poker Rules",
        short_name: "Poker Rules",
        description: "Internal poker rules reference",
        theme_color: "#0f172a",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/rb/9-24-24-x7k3p/",
        scope: "/rb/9-24-24-x7k3p/",
        icons: [
          { src: "assets/images/seminole-logo.jpg", sizes: "192x192", type: "image/png" },
          { src: "assets/images/seminole-logo.jpg", sizes: "512x512", type: "image/png" },
        ],
      },

      workbox: {
        // ✅ Helps SPA routing + offline navigation under the secret path
        navigateFallback: "/rb/9-24-24-x7k3p/index.html",
        navigateFallbackDenylist: [/^\/api\//, /^\/rules\//, /\/assets\//],

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
});
