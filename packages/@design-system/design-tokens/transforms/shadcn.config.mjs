import pluginCSS from "@cobalt-ui/plugin-css";
import pluginTailwind from "@cobalt-ui/plugin-tailwind";
import * as culori from "culori";

// Tailwind v4 Shadcn UI setup
// https://www.luisball.com/blog/shadcn-ui-with-tailwind-v4

/** @type {import("@cobalt-ui/core").Config} */
export default {
  tokens: [
    "../tokens/base/colors.json",
    "../tokens/base/radii.json",
    "../tokens/themes/shadcn.json",
  ],
  outDir: "../dist/",
  plugins: [
    pluginCSS({
      filename: "./shadcn.variables.css",
      p3: false,
      transform(token, mode) {
        if (token.$type === "color") {
          const colorValue = token.$extensions?.mode?.[mode] ?? token.$value;

          const { h, s, l } = culori.hsl(culori.parse(colorValue));
          return [
            Math.round(h || 0),
            `${Math.round(s * 100)}%`,
            `${Math.round(l * 100)}%`,
          ].join(" ");
        }
      },
      modeSelectors: [
        {
          mode: "dark",
          selectors: [':root[data-color-scheme="dark"]'],
        },
      ],
    }),
    pluginTailwind({
      filename: "./shadcn.tailwind.presets.mjs",
      outputFormat: "esm",
      transform(token) {
        const cssVar = `var(--${token.id})`;
        if (token.$type === "color") {
          return `"hsl(${cssVar})"`;
        }
        if (token.$type === "dimension") {
          return `"${cssVar}"`;
        }
      },
      tailwind: {
        theme: {
          colors: {
            border: `colors-border`,
            input: `colors-input`,
            ring: `colors-ring`,
            background: `colors-background`,
            foreground: `colors-foreground`,
            primary: {
              DEFAULT: `colors-primary`,
              foreground: `colors-primary-foreground`,
            },
            secondary: {
              DEFAULT: `colors-secondary`,
              foreground: `colors-secondary-foreground`,
            },
            destructive: {
              DEFAULT: `colors-destructive`,
              foreground: `colors-destructive-foreground`,
            },
            muted: {
              DEFAULT: `colors-muted`,
              foreground: `colors-muted-foreground`,
            },
            accent: {
              DEFAULT: `colors-accent`,
              foreground: `colors-accent-foreground`,
            },
            popover: {
              DEFAULT: `colors-popover`,
              foreground: `colors-popover-foreground`,
            },
            card: {
              DEFAULT: `colors-card`,
              foreground: `colors-card-foreground`,
            },
            sidebar: {
              DEFAULT: `colors-sidebar-background`,
              foreground: `colors-sidebar-foreground`,
              primary: `colors-sidebar-primary`,
              "primary-foreground": `colors-sidebar-primary-foreground`,
              accent: `colors-sidebar-accent`,
              "accent-foreground": `colors-sidebar-accent-foreground`,
              border: `colors-sidebar-border`,
              ring: `colors-sidebar-ring`,
            },
          },
          borderRadius: {
            DEFAULT: `borderRadius`,
            xs: `borderRadius-xs`,
            sm: `borderRadius-sm`,
            md: `borderRadius-md`,
            lg: `borderRadius-lg`,
            xl: `borderRadius-xl`,
          },
        },
      },
    }),
  ],
};
