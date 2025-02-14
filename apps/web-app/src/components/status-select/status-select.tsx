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

interface StatusSelectProps {
  status?: LocationStatusType;
  onChange: (status: LocationStatusType) => void;
}

function StatusSelect({ status, onChange }: StatusSelectProps) {
  return (
    <Select value={status} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a status">
          {status && <LocationStatus status={status} />}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
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

export { StatusSelect };
