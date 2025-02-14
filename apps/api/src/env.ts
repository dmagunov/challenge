import { z } from "zod";

const envSchema = z.object({
  API_HOST: z.string().min(1).default("localhost"),
  API_PORT: z.string().min(1).default("3001"),
});

export const env = envSchema.parse({
  API_HOST: process.env.API_HOST,
  API_PORT: process.env.API_PORT,
});
