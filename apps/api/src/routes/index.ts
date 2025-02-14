import { Hono } from "hono";
import locationsRoutes from "./locations";

export default new Hono().route("/locations", locationsRoutes);
