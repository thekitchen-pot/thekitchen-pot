import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// import cloudflare from "@astrojs/cloudflare";

import netlify from "@astrojs/netlify";

// import auth from "auth-astro";

// import decapCmsOauth from "astro-decap-cms-oauth";

// https://astro.build/config
export default defineConfig({
  site: "https://thekitchenpot.com",

  // trailingSlash: "always",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    icon(), // decapCmsOauth()
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date("2025-07-08"),
    }),
    // auth()
  ],
  output: "static",

  adapter: netlify(),
});
