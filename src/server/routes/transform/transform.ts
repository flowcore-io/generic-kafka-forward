import env from "@/env"
import { producer } from "@/lib/kafka"
// src/server/routes/transform/transform.ts
import { createLogger } from "@/lib/logger"
import { Elysia, t } from "elysia"
import { get } from "lodash"
import { SourceEventDto } from "./transform.dto"

export const logger = createLogger("transform")

export const ExamplePayloadDto = t.Object({
  example: t.String(),
})

export const transform = new Elysia({
  prefix: "/transform",
  tags: ["transform"],
})

  // Setup of Rest API Endpoints
  .post(
    "/",
    async ({ body: event }) => {
      const { payload } = event

      // event format validation
      // const result = Value.Parse(ExamplePayloadDto, payload)
      // Extract the key from the payload using the configurable path
      const keyPath = env.KAFKA_KEY_PATH
      const key_value = get(payload, keyPath)

      if (!key_value) {
        if (env.KAFKA_IGNORE_EMPTY_KEY) {
          logger.warn(`No key found in the payload, using path: '${keyPath}'`)
          return
        }
      }

      const headers: {
        [p: string]: string
      } = {}

      if (env.KAFKA_ADD_FLOWCORE_HEADERS) {
        headers["x-flowcore-event-source"] = `${event.dataCore}/${event.aggregator}/${event.eventType}/${event.eventId}`
        headers["x-flowcore-timeBucket"] = event.timeBucket
      }

      logger.debug(`Sending message to Kafka topic: ${env.KAFKA_TOPIC} with key: ${key_value}`)

      // Send message to Kafka
      return await producer.send({
        topic: env.KAFKA_TOPIC,
        messages: [{ key: key_value, value: JSON.stringify(payload), headers }],
      })
    },
    {
      body: SourceEventDto,
    },
  )
