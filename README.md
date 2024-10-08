# Generic Kafka Forward

Forwards events from (flowcore)[https://www.flowcore.io] to Kafka.

### Environment Variables

| Environment Variable             | Description                            |   Type    | Default Value                             | Required |
|----------------------------------|----------------------------------------|:---------:|-------------------------------------------|:--------:|
| NODE_ENV                         | The environment the app is running in  | `string`  | `production`                              |          |
| LOG_LEVEL                        | The log level                          | `string`  | `info`                                    |          |
| LOG_PRETTY                       | Whether to log in pretty format        | `boolean` | `false`                                   |          |
| KAFKA_BROKER                     | Kafka broker URL                       | `string`  |                                           |    ✓     |
| KAFKA_TOPIC                      | Kafka topic                            | `string`  |                                           |    ✓     |
| KAFKA_GROUP_ID                   | Kafka group ID                         | `string`  | `flowcore-generic-kafka-forwarder`        |          |
| KAFKA_CLIENT_ID                  | Kafka client ID                        | `string`  | `flowcore-generic-kafka-forwarder-client` |          |
| KAFKA_SSL                        | Use SSL for Kafka connection           | `boolean` | `false`                                   |          |
| KAFKA_SASL_MECHANISM             | Kafka SASL mechanism                   | `string`  |                                           |          |
| KAFKA_USERNAME                   | Kafka username                         | `string`  | `""`                                      |          |
| KAFKA_PASSWORD                   | Kafka password                         | `string`  | `""`                                      |          |
| KAFKAJS_NO_PARTITIONER_WARNING   | Disable partitioner warning            | `boolean` | `true`                                    |          |
| KAFKA_AWS_AUTHORIZATION_IDENTITY | Kafka AWS authorization identity       | `string`  | `""`                                      |          |
| KAFKA_KEY_PATH                   | Kafka key path                         | `string`  | `key`                                     |          |
| KAFKA_IGNORE_EMPTY_KEY           | Ignore empty Kafka key                 | `boolean` | `false`                                   |          |
| KAFKA_ADD_FLOWCORE_HEADERS       | Add Flowcore headers to Kafka messages | `boolean` | `false`                                   |          |
| SERVICE_PORT                     | The port the service will listen on    |   `int`   | `3000`                                    |          |

## App setup

```bash
# Install/update dependencies
bun install

# Make a copy of the .env.example to .env
cp .env.example .env

# You can create a new api key in flowcore and set the `FLOWCORE_API_KEY` environment variable in the `.env` file.
```

## Building

```bash
# Start the app in watch mode
bun dev
```

## Testing

```bash
# Run tests
bun test
```

## Deployment

Copy the ./services/example-flowcore-deployment.yaml file to ./services/flowcore-deployment.yaml and edit the file to
match your environment.

```bash
flowcore scenario apply -f services/flowcore-deployment.yaml
```
