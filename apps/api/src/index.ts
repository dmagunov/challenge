import { Hono } from "hono";
import { cors } from "hono/cors";
import { versionMiddleware } from "./middleware/version.middleware";
import { API_VERSIONS } from "./config/versions";
import v20240101 from "./routes";
import { env } from "./env";
import { showRoutes } from "hono/dev";

const app = new Hono();

app.use("*", cors()).use("*", versionMiddleware);

const api = app.route("/api", v20240101);

app.get("/api", (c) => {
  return c.json({
    versions: Object.entries(API_VERSIONS).map(([version, config]) => ({
      version,
      ...config,
      endpoints: {
        sample: "/api/sample",
      },
    })),
  });
});

showRoutes(app, {
  verbose: true,
  colorize: true,
});

export default {
  fetch: app.fetch,
  port: env.API_PORT,
  hostname: env.API_HOST,
  // TODO: move to env
  idleTimeout: 30,
};

export type ApiType = typeof api;
