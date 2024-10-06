// src/server/index.ts
import env from "@/env"
import { server } from "@/server"
import { createLogger } from "@/lib/logger"
import { connectKafka } from "@/lib/kafka"

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
