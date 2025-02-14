import type { Config } from "tailwindcss";

const config: Config = {
  presets: [require("@design-system/shadcn/tailwind.config.ts")],
  content: ["./node_modules/@design-system/shadcn/src/**/*.{js,ts,jsx,tsx}"],
};

export default config;
