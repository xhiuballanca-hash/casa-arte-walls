import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

const pages = [
  "/", "/about", "/products", "/portfolio", "/architects", "/services", "/contact", "/blog",
  "/products/travertino", "/products/marmorino", "/products/stucco-veneziano", "/products/sahara",
  "/products/microcement", "/products/beton-look",
  "/blog/art-of-venetian-plaster", "/blog/choosing-finish-for-your-space",
  "/blog/microcement-seamless-surfaces", "/blog/green-in-italian-design",
];

// Builds the whole site as plain static files (dist/client) for GitHub Pages.
export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true, autoSubfolderIndex: true, failOnError: true },
      pages: pages.map((path) => ({ path })),
    }),
    viteReact(),
  ],
});
