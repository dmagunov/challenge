import { useQuery } from "@tanstack/react-query";
import type { InferRequestType } from "hono/client";

import { api } from "~/api/client";

const $get = api.api.sample.$get;

type SampleQueryParams = InferRequestType<typeof $get>["query"];

function useSampleQuery({
  param,
}: SampleQueryParams) {
  return useQuery({
    queryKey: ["sample", { param }],
    queryFn: async () => {
      const response = await $get({
        query: {
          param,
        },
      });

      if (!response.ok) {
        throw new Error("Sample query failed");
      }

      return response.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export { useSampleQuery };
