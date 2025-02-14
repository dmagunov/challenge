import shadcnConfig from "@design-system/shadcn/tailwind.config.ts";
import type { Config } from "tailwindcss";

const config: Config = {
  presets: [shadcnConfig],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./node_modules/@design-system/shadcn/src/**/*.{ts,tsx,js,jsx}",
  ],

  theme: {
    container: {
      center: true,
    },
  },
};

export default config;
