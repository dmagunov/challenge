import { Trans, useLingui } from "@lingui/react/macro";
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
  const { t } = useLingui();
  const { isPending, error, data } = useLocationsQuery({
    search,
    status: status === "All" ? undefined : status,
  });

  if (isPending) {
    return (
      <div role="status" aria-live="polite">
        <Trans>Loading...</Trans>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" aria-live="assertive">
        <Trans>Error: {error.message}</Trans>
      </div>
    );
  }

  const locationCount = data.locations.length;

  return (
    <div>
      <div className="mb-6 flex items-baseline justify-between">
        <h1 className="text-2xl font-bold">
          <Trans>Charging Points</Trans>
        </h1>
        <p className="text-sm text-muted-foreground">
          <Trans>{locationCount} locations found</Trans>
        </p>
      </div>
      <ul
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label={t`List of charging points`}
      >
        {data.locations.map((location: Location) => (
          <li key={location.locationId}>
            <LocationCard location={location} />
          </li>
        ))}
      </ul>
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
