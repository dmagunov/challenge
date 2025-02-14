import { z } from "zod";

export const sampleSchema = z.object({
  param: z.string().min(1),
});

export type SampleRequest = z.infer<typeof sampleSchema>;
