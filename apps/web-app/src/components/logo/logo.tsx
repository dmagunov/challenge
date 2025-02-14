import React from "react";

// import LogoTextDark from "public/logo-text-dark.svg?react";
// import LogoTextLight from "public/logo-text-light.svg?react";
import { useColorScheme } from "~/contexts/color-scheme";

function Logo() {
  const { colorScheme } = useColorScheme();

  // return <>{colorScheme === "dark" ? <LogoTextDark /> : <LogoTextLight />}</>;
  return null;
}

export { Logo };
