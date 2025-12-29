import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "./src/assets/images/*.jpg",
        "./src/assets/images/*.png",
        "./src/assets/images/*.svg",
        "public/icons/*.png",
        "public/icons/*.svg",
      ],

      manifest: {
        name: "Poker Rules",
        short_name: "Poker Rules",
        description: "Internal poker rules reference",
        theme_color: "#0f172a",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          { src: "/icons/icon-64.png", sizes: "64x64", type: "image/png" },
          { src: "/icons/icon-180.png", sizes: "180x180", type: "image/png" },
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          // Maskable / adaptive hint: add `purpose` so supported platforms can use adaptive masking
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
        ],
      },

      workbox: {
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [
          /^\/api\//,
          /^\/rules\//,
          /^\/assets\//,
          /^\/icons\//,
        ],
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.pathname.startsWith("/rules/") &&
              url.pathname.endsWith(".json"),
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
