import { Trans } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { SearchInput, StatusSelect } from "~/components";
import { LocationStatus } from "~/types";
import { useLocationsQuery, useDebounce } from "~/hooks";

interface SearchResultsProps {
  search: string;
  status?: LocationStatus;
}

function SearchResults({ search, status }: SearchResultsProps) {
  const {
    isPending,
    error,
    data: locations,
  } = useLocationsQuery({
    search,
    status,
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
  const [status, setStatus] = React.useState<LocationStatus | undefined>(
    undefined
  );
  const debouncedSearch = useDebounce(searchTerm, 300);

  const handleSearch = React.useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleStatusChange = React.useCallback((value: LocationStatus) => {
    setStatus(value);
  }, []);

  return (
    <div className="flex min-h-screen flex-col gap-4 p-4">
      <SearchInput onSearch={handleSearch} />
      <StatusSelect onChange={handleStatusChange} />
      <Trans>Welcome to My App</Trans>
      <SearchResults search={debouncedSearch} status={status} />
    </div>
  );
}

export { Route };
