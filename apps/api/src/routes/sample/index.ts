import { Hono } from "hono";
import { createFactory } from "hono/factory";
import { zValidator } from "@hono/zod-validator";
import { sampleSchema, type SampleRequest } from "./schema";

const factory = createFactory();

async function getSample(payload: SampleRequest) {
  return {
    data: {
      list: null,
    },
  };
}

const sampleHandler = factory.createHandlers(
  zValidator("query", sampleSchema),
  async (c) => {
    try {
      const payload = c.req.valid("query");
      const sample = await getSample(payload);
      return c.json({ sample });
    } catch (error) {
      console.error("Sample error:", error);
      return c.json(
        {
          error: "Sample service failed",
          details: error instanceof Error ? error.message : String(error),
        },
        500
      );
    }
  }
);

export default new Hono().get("/", ...sampleHandler);

export { getSample };
