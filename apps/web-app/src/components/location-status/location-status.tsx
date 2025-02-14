import { cn } from "@design-system/core/utils";
import type { LocationStatus as LocationStatusType } from "api/locations";

interface LocationStatusProps {
  status: LocationStatusType | undefined;
  showLabel?: boolean;
  className?: string;
}

function getStatusColor(status: LocationStatusType | undefined) {
  switch (status) {
    // TODO: Use design system colors
    case "Available":
      return "bg-green-500";
    case "In use":
      return "bg-yellow-500";
    case "Suspended":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

function LocationStatus({
  status,
  showLabel = true,
  className,
}: LocationStatusProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("h-3 w-3 rounded-full", getStatusColor(status))} />
      {showLabel && <span className="text-sm">{status || "Unknown"}</span>}
    </div>
  );
}

export { LocationStatus };
