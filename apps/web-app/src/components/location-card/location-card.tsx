import React from "react";
import { Battery, MapPin, Zap, Globe, Lock } from "lucide-react";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@design-system/shadcn";
import { Trans } from "@lingui/react/macro";

import type { Location, LocationStatus } from "api/locations";

const getStatusColor = (status: LocationStatus | undefined) => {
  switch (status) {
    case "Available":
      return "bg-green-500";
    case "In use":
      return "bg-yellow-500";
    case "Suspended":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const LocationCard = ({ location }: { location: Location }) => {
  return (
    <Card key={location.locationId} className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          {location.address.name}
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          {location.address.street}, {location.address.zipCode}{" "}
          {location.address.city}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">
            <Trans>Status</Trans>
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-full ${getStatusColor(location.status)}`}
            ></span>
            <span className="text-sm">{location.status || "Unknown"}</span>
          </div>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">
            <Trans>Max Power</Trans>
          </span>
          <Badge variant="secondary">
            <Battery className="mr-1 h-4 w-4" />
            {location.maxPower} kW
          </Badge>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">
            <Trans>Connector Type</Trans>
          </span>
          <span className="text-sm">{location.connectorType}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            <Trans>Access</Trans>
          </span>
          <Badge variant={location.public ? "default" : "outline"}>
            {location.public ? (
              <Globe className="mr-1 h-4 w-4" />
            ) : (
              <Lock className="mr-1 h-4 w-4" />
            )}
            {location.public ? <Trans>Public</Trans> : <Trans>Private</Trans>}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export { LocationCard };
