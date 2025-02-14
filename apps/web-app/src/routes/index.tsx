import { Trans } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

import { useSampleQuery } from "~/hooks";


export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, error, data } = useSampleQuery({
    param: "test",
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
      <div className="flex min-h-screen">
        <Trans>Welcome to My App</Trans>
      </div>
  );
}
