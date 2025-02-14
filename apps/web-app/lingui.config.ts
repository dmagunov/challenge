import { defineConfig } from "@lingui/cli";

const config = defineConfig({
  locales: ["en", "da", "pseudo"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}",
      include: ["src"],
    },
  ],
  compileNamespace: "es",
});

export default config;
