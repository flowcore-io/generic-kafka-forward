import Elysia, { t } from "elysia"

const healthResponse = t.Object({
  status: t.String({ description: "The status of the API", examples: ["ok"] }),
})

export const health = new Elysia({
  prefix: "/health",
  tags: ["health"],
}).get("/", () => ({ status: "ok" }), {
  response: healthResponse,
})
