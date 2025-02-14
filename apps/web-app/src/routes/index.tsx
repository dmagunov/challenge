import { Trans } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { SearchInput, StatusSelect, LocationCard } from "~/components";
import { LocationStatus, Location } from "api/locations";
import { useLocationsQuery, useDebounce } from "~/hooks";

interface SearchResultsProps {
  search: string;
  status?: LocationStatus | "All";
}

function SearchResults({ search, status }: SearchResultsProps) {
  const { isPending, error, data } = useLocationsQuery({
    search,
    status: status === "All" ? undefined : status,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">
        <Trans>Charging Points</Trans>
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.locations.map((location: Location) => (
          <LocationCard key={location.locationId} location={location} />
        ))}
      </div>
    </div>
  );
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
    <div className="flex min-h-screen flex-col gap-8 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="w-full sm:flex-1">
          <SearchInput onSearch={handleSearch} />
        </div>
        <div className="w-full sm:w-[200px]">
          <StatusSelect onChange={handleStatusChange} />
        </div>
      </div>
      <SearchResults search={debouncedSearch} status={status} />
    </div>
  );
}

export { Route };
