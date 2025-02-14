import { Hono } from "hono";
import sampleRoutes from "./sample";

export default new Hono().route("/sample", sampleRoutes);

