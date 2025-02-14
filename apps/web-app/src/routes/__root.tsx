import { createRootRoute, Outlet } from "@tanstack/react-router";
import React from "react";

import { Menu, Footer, ThemeSwitcher } from "~/components";

// https://github.com/TanStack/router/issues/1992
function RootComponent(): React.ReactElement {
  return (
    <>
      <header className="py-6">
        <Container>
          <nav className="flex items-center justify-end space-x-4">
            <Menu />
            <ThemeSwitcher />
          </nav>
        </Container>
      </header>
      <Container>
        <Outlet />
      </Container>
      <footer className="w-full">
        <Footer />
      </footer>
    </>
  );
}

const Route = createRootRoute({
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

export { Route };
