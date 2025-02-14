import { createRootRoute, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";

import { Menu, Footer, ThemeSwitcher } from "~/components";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

// https://github.com/TanStack/router/issues/1992
function RootComponent(): React.ReactElement {
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-inherit py-6">
        <Container>
          <nav className="flex items-center justify-between space-x-6">
            <div className="flex items-center gap-6">
              <Menu />
              <ThemeSwitcher />
            </div>
          </nav>
        </Container>
      </header>
      <Outlet />
      <footer className="w-full">
        <Footer />
      </footer>

      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});

function Container({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="container mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
