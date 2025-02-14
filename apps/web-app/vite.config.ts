import { lingui } from "@lingui/vite-plugin";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
// https://www.npmjs.com/package/@winter-love/vite-plugin-monorepo-alias
import tsconfigPaths from "vite-tsconfig-paths";

import { colorSchemePlugin } from "./src/plugins";

export default defineConfig({
  base: "./",
  plugins: [
    TanStackRouterVite(),
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
    // TODO: fix failing on build
    // VitePWA({ registerType: "autoUpdate" }),
    lingui(),
    tsconfigPaths(),
    colorSchemePlugin(),
    svgr(),
  ],
  optimizeDeps: {
    include: ["react-dom"],
  },
  build: {
    target: "ES2022",
  },
});
