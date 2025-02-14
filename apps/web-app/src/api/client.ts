import { hc } from "hono/client";
import { type ApiType } from "api";

const client = hc<ApiType>(
  // fallback in case .env is not available
  import.meta.env.VITE_API_URL ?? "http://localhost:3001"
);

export { client };
