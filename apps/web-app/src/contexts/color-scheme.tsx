import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ColorScheme = "light" | "dark" | "system";

interface ColorSchemeContextValue {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  resolvedColorScheme: "light" | "dark";
}

const ColorSchemeContext = createContext<ColorSchemeContextValue | null>(null);

function ColorSchemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(
    () => (localStorage.getItem("color-scheme") as ColorScheme) || "system"
  );

  const resolveColorScheme = (scheme: ColorScheme): "light" | "dark" => {
    if (scheme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return scheme;
  };

  const setColorScheme = (newScheme: ColorScheme) => {
    setColorSchemeState(newScheme);
    localStorage.setItem("color-scheme", newScheme);
  };

  useEffect(() => {
    const resolved = resolveColorScheme(colorScheme);
    document.documentElement.setAttribute("data-color-scheme", resolved);

    if (colorScheme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        const resolved = resolveColorScheme("system");
        document.documentElement.setAttribute("data-color-scheme", resolved);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [colorScheme]);

  return (
    <ColorSchemeContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        resolvedColorScheme: resolveColorScheme(colorScheme),
      }}
    >
      {children}
    </ColorSchemeContext.Provider>
  );
}

function useColorScheme() {
  const context = useContext(ColorSchemeContext);

  if (!context) {
    throw new Error("useColorScheme must be used within a ColorSchemeProvider");
  }

  return context;
}

export { ColorSchemeProvider, useColorScheme };
export type { ColorScheme };
