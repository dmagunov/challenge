import { Input } from "@design-system/shadcn";
import { Trans } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

import { useLocationsQuery, useDebounce } from "~/hooks";

const SearchInput = React.memo(function SearchInput({
  onSearch,
}: {
  onSearch: (value: string) => void;
}) {
  const [value, setValue] = React.useState("");

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setValue(newValue);
      onSearch(newValue);
    },
    [onSearch]
  );

  return (
    <Input
      placeholder="Search locations..."
      value={value}
      onChange={handleChange}
    />
  );
});

function SearchResults({ search }: { search: string }) {
  const {
    isPending,
    error,
    data: locations,
  } = useLocationsQuery({
    search,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <pre>{JSON.stringify(locations, null, 2)}</pre>;
}

const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const handleSearch = React.useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return (
    <div className="flex min-h-screen flex-col gap-4 p-4">
      <SearchInput onSearch={handleSearch} />
      <Trans>Welcome to My App</Trans>
      <SearchResults search={debouncedSearch} />
    </div>
  );
}

export { Route };
