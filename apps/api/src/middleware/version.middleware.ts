import { Context, Next } from "hono";
import { API_VERSIONS } from "~/config/versions";

export async function versionMiddleware(c: Context, next: Next) {
  const version = c.req.header("api-version") || "2024-01-01";

  if (!API_VERSIONS[version]) {
    return c.json(
      {
        error: "Invalid API version",
        availableVersions: Object.keys(API_VERSIONS),
      },
      400
    );
  }

  c.set("apiVersion", version);
  c.header("X-API-Version", version);

  await next();
}
