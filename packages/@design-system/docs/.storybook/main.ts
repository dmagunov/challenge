import type { StorybookConfig } from "@storybook/react-vite";
import { join, dirname, resolve } from "path";

const excludedProps = new Set(["id", "slot", "ref", "key"]);

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

console.log(require.resolve("@design-system/shadcn"));
// TODO: https://storybook.js.org/addons/@storybook/addon-a11y

const config: StorybookConfig = {
  // stories: ["../../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  stories: [
    "../node_modules/@design-system/shadcn/src/stories/**/*.stories.@(tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("storybook-dark-mode"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      tsconfigPath: getAbsolutePath("@design-system/shadcn") + "/tsconfig.json",
      shouldExtractLiteralValuesFromEnum: true, // Extract literal values from enums
      shouldRemoveUndefinedFromOptional: true, // Better handling of optional props

      propFilter: (prop) => {
        // Filter out props from node_modules except @design-system packages
        if (prop.parent) {
          const isDesignSystem =
            prop.parent.fileName.includes("@design-system");
          const isNodeModule = prop.parent.fileName.includes("node_modules");
          return !isNodeModule || isDesignSystem;
        }
        return !prop.name.startsWith("aria-") && !excludedProps.has(prop.name);
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
