# Generic Kafka Forward 2



### Environment Variables

| Environment Variable            | Description                         |   Type   | Default Value | Required |
|---------------------------------|-------------------------------------|:--------:|---------------|:--------:|
| LOG_LEVEL                       | The log level                       | `string` | `info`        |          |
| LOG_PRETTY                      | Whether to log in pretty format     | `int`    | `0`           |          |
| SERVICE_PORT                    | The port the service will listen on | `int`    | `3000`        |          |


# Development

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
