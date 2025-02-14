import { resolve } from "path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
    alias: {
      "~": resolve(__dirname, "node_modules/@design-system/shadcn/src"),
    },
    css: false,
  },
});
