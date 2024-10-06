import { health } from "@/server/routes/health"
import Elysia from "elysia"
import { transform } from "./routes/transform/transform"

export const server = new Elysia().use(health)

// Add routes here
server.use(transform)
