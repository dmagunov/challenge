import { Hono } from "hono";
import { createFactory } from "hono/factory";
import { zValidator } from "@hono/zod-validator";
import {
  locationsRequestSchema,
  type LocationsRequest,
  type Location,
} from "./schema";
import locationsData from "./locations.json";

const factory = createFactory();

async function getLocations(payload: LocationsRequest) {
  let filteredLocations = locationsData as Location[];

  if (payload.search) {
    const searchTerm = payload.search.toLowerCase();
    filteredLocations = filteredLocations.filter((location) => {
      const address = location.address;
      return (
        address.name.toLowerCase().includes(searchTerm) ||
        address.street.toLowerCase().includes(searchTerm) ||
        address.city.toLowerCase().includes(searchTerm) ||
        address.zipCode.includes(searchTerm)
      );
    });
  }

  if (payload.status) {
    filteredLocations = filteredLocations.filter(
      (location) => location.status === payload.status
    );
  }

  return {
    locations: filteredLocations,
  };
}

const locationsHandler = factory.createHandlers(
  zValidator("query", locationsRequestSchema),
  async (c) => {
    try {
      const payload = c.req.valid("query");
      const locations = await getLocations(payload);
      return c.json(locations);
    } catch (error) {
      console.error("Locations error:", error);
      return c.json(
        {
          error: "Locations service failed",
          details: error instanceof Error ? error.message : String(error),
        },
        500
      );
    }
  }
);

export default new Hono().get("/", ...locationsHandler);

export { getLocations };
