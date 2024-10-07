import { producer } from "@/lib/kafka"
// src/server/routes/transform/transform.ts
import { createLogger } from "@/lib/logger"
import { Elysia, t } from "elysia"
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

      console.log("transform", event)

      // Send message to Kafka
      await producer.send({
        topic: "your-topic",
        messages: [{ value: JSON.stringify(payload) }],
      })
    },
    {
      body: SourceEventDto,
    },
  )
