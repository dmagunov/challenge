import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@design-system/shadcn";
import { LocationStatus } from "~/types";

interface StatusSelectProps {
  status?: LocationStatus;
  onChange: (status: LocationStatus) => void;
}

function StatusSelect({ status, onChange }: StatusSelectProps) {
  return (
    <Select value={status} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Available">Available</SelectItem>
        <SelectItem value="In use">In use</SelectItem>
        <SelectItem value="Suspended">Suspended</SelectItem>
      </SelectContent>
    </Select>
  );
}

export { StatusSelect };
