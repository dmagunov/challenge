import React, { useCallback, useState } from "react";
import { useLingui } from "@lingui/react/macro";

import { Input } from "@design-system/shadcn";

const SearchInput = React.memo(function SearchInput({
  onSearch,
}: {
  onSearch: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const { t } = useLingui();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setValue(newValue);
      onSearch(newValue);
    },
    [onSearch]
  );

  return (
    <Input
      placeholder={t`Search locations...`}
      value={value}
      onChange={handleChange}
    />
  );
});

export { SearchInput };
