import env from "@/env"
import { Style, colorize } from "@/lib/utils"
import { format, transports, createLogger as winstonCreateLogger } from "winston"

// TODO: https://www.npmjs.com/package/@opentelemetry/instrumentation-winston

const levelColors: Record<string, Style[]> = {
  debug: [Style.CYAN],
  info: [Style.GREEN],
  warn: [Style.YELLOW],
  error: [Style.RED],
}

const customPrettyPrint = format.printf((log) => {
  const { timestamp, label, level, message, ...rest } = log
  return [
    colorize(timestamp, [Style.BOLD]),
    colorize(`(${label})`, [Style.PURPLE]),
    colorize(`${level.toUpperCase()}:`, levelColors[level] || []),
    message,
    colorize(`- ${JSON.stringify(rest)}`, [Style.THIN]),
  ].join(" ")
})

export function createLogger(label?: string) {
  const winstonFormat = env.LOG_PRETTY
    ? format.combine(format.label({ label }), format.timestamp(), customPrettyPrint)
    : format.combine(format.label({ label }), format.timestamp(), format.json())

  return winstonCreateLogger({
    level: env.LOG_LEVEL,
    format: winstonFormat,
    defaultMeta: { label },
    transports: [new transports.Console()],
  })
}
