import type { Preview } from "@storybook/react";
import React, { useEffect } from "react";
import { useDarkMode } from "storybook-dark-mode";
// TODO: refactor to not use @storybook/theming
import { themes, Global, css } from "@storybook/theming";
import "@design-system/shadcn/styles.css";

const DATA_COLOR_SCHEME_ATTR = "data-color-scheme";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: { disable: true },
    controls: {
      exclude: /^on[A-Z].*/,
    },
    darkMode: {
      classTarget: "html",
      stylePreview: true,
    },
    a11y: {
      config: {
        rules: [
          {
            id: "aria-hidden-focus",
            selector: 'body *:not([data-a11y-ignore="aria-hidden-focus"])',
          },
        ],
      },
    },
  },
  decorators: [
    (Story) => {
      const isDark = useDarkMode();

      useEffect(() => {
        let colorScheme = isDark ? "dark" : "light";

        if (
          document.documentElement.getAttribute(DATA_COLOR_SCHEME_ATTR) !==
          colorScheme
        ) {
          document.documentElement.setAttribute(
            DATA_COLOR_SCHEME_ATTR,
            isDark ? "dark" : "light"
          );
        }
      }, [isDark]);

      return (
        <>
          {/* TODO: use app specific theme and theme provider  */}
          <Global
            styles={css`
              .dark {
                background-color: ${themes.dark.appBg};
              }
            `}
          />
          <Story />
        </>
      );
    },
  ],
};

export default preview;
