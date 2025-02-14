import { useQuery } from "@tanstack/react-query";
import type { InferRequestType } from "hono/client";

import { client } from "~/api";

const $get = client.api.locations.$get;

type LocationsQueryParams = InferRequestType<typeof $get>["query"];

function useLocationsQuery({ status, search }: LocationsQueryParams) {
  return useQuery({
    queryKey: ["locations", { status, search }],
    queryFn: async () => {
      const response = await $get({
        query: {
          status,
          search,
        },
      });

      if (!response.ok) {
        throw new Error("Locations query failed");
      }

      return response.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export { useLocationsQuery };
