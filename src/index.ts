// src/server/index.ts
import env from "@/env"
import { connectKafka } from "@/lib/kafka"
import { createLogger } from "@/lib/logger"
import { server } from "@/server"

const logger = createLogger("index")

async function startServer() {
  await connectKafka()
  server.listen(env.PORT, () => {
    logger.info(`Transformer is running on port ${env.PORT}`)
  })
}

startServer().catch((err) => {
  logger.error("Failed to start server", err)
})
