import { Trans } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { SearchInput } from "~/components";

import { useLocationsQuery, useDebounce } from "~/hooks";

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
