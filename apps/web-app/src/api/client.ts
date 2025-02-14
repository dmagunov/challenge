import { hc } from "hono/client";
import { type ApiType } from "api";

const api = hc<ApiType>(
  import.meta.env.VITE_API_URL ?? "http://localhost:3001"
);

export { api };
