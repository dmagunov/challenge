import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-color-scheme="dark"]'],
  content: ["../components/**/*.{js,ts,jsx,tsx}"],

  presets: [
    {
      theme: {
        extend:
          require("@design-system/design-tokens/shadcn.tailwind.presets.mjs") as Config["theme"],
      },
    },
  ],

  plugins: [require("tailwindcss-animate")],
};

export default config;
