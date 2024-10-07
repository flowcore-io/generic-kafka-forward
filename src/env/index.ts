import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "staging", "test"]).default("production"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  LOG_PRETTY: z.coerce.boolean().default(false),
  KAFKA_BROKER: z.string(),
  KAFKA_TOPIC: z.string(),
  KAFKA_GROUP_ID: z.string().optional().default("flowcore-generic-kafka-forwarder"),
  KAFKA_CLIENT_ID: z.string().default("flowcore-generic-kafka-forwarder-client"),
  KAFKA_SSL: z.coerce.boolean().default(false),
  KAFKA_SASL_MECHANISM: z.enum(["plain", "aws", "scram-sha-256", "scram-sha-512"]).optional(),
  KAFKA_USERNAME: z.coerce.string().default(""),
  KAFKA_PASSWORD: z.coerce.string().default(""),
  KAFKAJS_NO_PARTITIONER_WARNING: z.coerce.boolean().default(true),
  KAFKA_AWS_AUTHORIZATION_IDENTITY: z.coerce.string().default(""),

  PORT: z.coerce.number().default(3000),
})

const env = envSchema.safeParse(process.env)

if (!env.success) {
  console.error("Missing environment variables", env.error.flatten().fieldErrors)
  process.exit(1)
}

export default env.data
