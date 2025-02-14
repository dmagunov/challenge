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

import type { Location } from "api/locations";
import { LocationStatus as LocationStatusComponent } from "../location-status";

const LocationCard = ({ location }: { location: Location }) => {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" aria-hidden="true" />
          <span>{location.address.name}</span>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <MapPin
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span>
            {location.address.street}, {location.address.zipCode}{" "}
            {location.address.city}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <dl className="space-y-2">
          <div className="flex items-center justify-between">
            <dt className="text-sm font-medium">
              <Trans>Status</Trans>
            </dt>
            <dd>
              <LocationStatusComponent status={location.status} />
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm font-medium">
              <Trans>Max Power</Trans>
            </dt>
            <dd>
              <Badge variant="secondary">
                <Battery className="mr-1 h-4 w-4" aria-hidden="true" />
                <span>{location.maxPower} kW</span>
              </Badge>
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm font-medium">
              <Trans>Connector Type</Trans>
            </dt>
            <dd className="text-sm">{location.connectorType}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm font-medium">
              <Trans>Access</Trans>
            </dt>
            <dd>
              <Badge variant={location.public ? "default" : "outline"}>
                {location.public ? (
                  <Globe className="mr-1 h-4 w-4" aria-hidden="true" />
                ) : (
                  <Lock className="mr-1 h-4 w-4" aria-hidden="true" />
                )}
                <span>
                  {location.public ? (
                    <Trans>Public</Trans>
                  ) : (
                    <Trans>Private</Trans>
                  )}
                </span>
              </Badge>
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};

export { LocationCard };
