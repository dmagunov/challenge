/* eslint-disable import/no-default-export -- This file needs to use default export for Prettier configuration */
import prettierConfig from "@configs/prettier";

export default {
  ...prettierConfig,
  tailwindConfig: new URL("./tailwind.config.ts", import.meta.url).pathname,
  tailwindFunctions: ["tv"],
  plugins: ["prettier-plugin-tailwindcss"],
};
