import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@design-system/shadcn";
import { useLingui } from "@lingui/react";
import { Check } from "lucide-react";
import React, { useCallback } from "react";

import { loadCatalog } from "../../i18n";

const languages = {
  en: "English",
  da: "Dansk",
} as const;

function Menu() {
  const { i18n } = useLingui();
  const currentLocale = i18n.locale;

  const handleLanguageChange = useCallback(
    async (locale: keyof typeof languages) => {
      await loadCatalog(locale);
      localStorage.setItem("language", locale);
    },
    []
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-lg uppercase">
          {currentLocale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {Object.entries(languages).map(([locale, label]) => (
            <DropdownMenuItem
              key={locale}
              onClick={() =>
                handleLanguageChange(locale as keyof typeof languages)
              }
            >
              <span>{label}</span>
              {currentLocale === locale && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { Menu };
