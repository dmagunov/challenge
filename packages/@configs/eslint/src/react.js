import jsConfig from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import importConfig from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

/**
 * A custom ESLint configuration for React projects
 *
 * @type {import("eslint").Linter.Config} */
export const config = tseslint.config(
  jsConfig.configs.recommended,
  tseslint.configs.recommended,

  importConfig.flatConfigs.recommended,
  importConfig.flatConfigs.react,
  importConfig.flatConfigs.typescript,
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    settings: {
      "import/resolver": {
        node: true,
        typescript: {
          project: ["tsconfig.json"],
        },
      },
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "import/no-dynamic-require": "warn",
      "import/no-nodejs-modules": "warn",
      "import/no-cycle": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
    },
  },

  pluginJsxA11y.flatConfigs.recommended,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // react plugins
  {
    files: ["**/*.{jsx,mjsx,tsx,mtsx}"],
    ...pluginReact.configs.flat.recommended,
  },

  {
    files: ["**/*.{jsx,mjsx,tsx,mtsx}"],
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.{ts,tsx,mtsx}"],
    plugins: {
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  prettierConfig
);
