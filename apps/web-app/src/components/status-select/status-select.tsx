import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@design-system/shadcn";
import type { LocationStatus as LocationStatusType } from "api/locations";
import { LocationStatus } from "~/components";
import { useLingui, Trans } from "@lingui/react/macro";
import { ListFilter } from "lucide-react";

interface StatusSelectProps {
  status?: LocationStatusType | "All";
  onChange: (status: LocationStatusType) => void;
}

function StatusSelect({ status, onChange }: StatusSelectProps) {
  const { t } = useLingui();

  return (
    <Select value={status} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={t`Select a status`}>
          {status === "All" ? (
            <AllStatuses />
          ) : (
            status && <LocationStatus status={status} />
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">
          <AllStatuses />
        </SelectItem>
        <SelectItem value="Available">
          <LocationStatus status="Available" />
        </SelectItem>
        <SelectItem value="In use">
          <LocationStatus status="In use" />
        </SelectItem>
        <SelectItem value="Suspended">
          <LocationStatus status="Suspended" />
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

function AllStatuses() {
  return (
    <div className="flex items-center gap-2">
      <ListFilter className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm">
        <Trans>All statuses</Trans>
      </span>
    </div>
  );
}

export { StatusSelect };
