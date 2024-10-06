// src/lib/kafka.ts
import {Kafka, type KafkaConfig, type SASLOptions} from 'kafkajs'
import env from '@/env'

const kafkaConfig: KafkaConfig = {
  clientId: env.KAFKA_CLIENT_ID,
  brokers: [env.KAFKA_BROKER],
  ssl: env.KAFKA_SSL,
}

if (env.KAFKA_SASL_MECHANISM == "plain") {
  kafkaConfig.sasl = {
    mechanism: env.KAFKA_SASL_MECHANISM,
    username: env.KAFKA_USERNAME,
    password: env.KAFKA_PASSWORD,
  }
}

if (env.KAFKA_SASL_MECHANISM == "aws") {
  kafkaConfig.sasl = {
    mechanism: env.KAFKA_SASL_MECHANISM,
    authorizationIdentity: env.KAFKA_AWS_AUTHORIZATION_IDENTITY,
    secretAccessKey: env.KAFKA_PASSWORD,
    accessKeyId: env.KAFKA_USERNAME
  }
}



const kafka = new Kafka(kafkaConfig)

export const producer = kafka.producer()

export async function connectKafka() {
  await producer.connect()
}
