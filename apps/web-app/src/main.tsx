import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import {
  RouterProvider,
  createRouter,
  createHashHistory,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ColorSchemeProvider } from "./contexts/color-scheme";
import { loadCatalog } from "./i18n";
import "./main.css";

const DEFAULT_LOCALE = "en";
const initialLocale = localStorage.getItem("language") || DEFAULT_LOCALE;

const hashHistory = createHashHistory();

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree, history: hashHistory });

await loadCatalog(initialLocale);

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ColorSchemeProvider>
        <I18nProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </I18nProvider>
      </ColorSchemeProvider>
    </StrictMode>
  );
}
