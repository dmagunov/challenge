import { z } from "zod";

const locationStatus = ["Available", "In use", "Suspended"] as const;
const locationType = ["spirii", "hubject"] as const;
const connectorType = ["sType2"] as const;

const addressSchema = z.object({
  name: z.string(),
  street: z.string(),
  zipCode: z.string(),
  city: z.string(),
  countryISO: z.string(),
});

const coordinatesSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

const locationStatusSchema = z.enum(locationStatus);

const locationSchema = z.object({
  locationId: z.union([z.number(), z.string()]),
  address: addressSchema,
  coordinates: coordinatesSchema,
  connectorType: z.enum(connectorType),
  status: locationStatusSchema.optional(),
  maxPower: z.number(),
  public: z.boolean(),
  type: z.enum(locationType),
});

const locationsRequestSchema = z.object({
  status: z.enum(locationStatus).optional(),
  search: z.string().optional(),
});

const locationsResponseSchema = z.object({
  locations: z.array(locationSchema),
});

type LocationsRequest = z.infer<typeof locationsRequestSchema>;
type LocationsResponse = z.infer<typeof locationsResponseSchema>;

type Location = z.infer<typeof locationSchema>;
type LocationStatus = z.infer<typeof locationStatusSchema>;

export { locationsRequestSchema, locationsResponseSchema, locationSchema };
export type { LocationsRequest, Location, LocationsResponse, LocationStatus };
