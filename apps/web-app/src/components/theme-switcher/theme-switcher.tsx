import { Around } from "@theme-toggles/react";
import React from "react";

import { useColorScheme } from "~/contexts/color-scheme";

function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <Around
      toggled={colorScheme === "dark"}
      toggle={() => setColorScheme(colorScheme === "dark" ? "light" : "dark")}
      className="text-3xl"
    />
  );
}

export { ThemeSwitcher };
