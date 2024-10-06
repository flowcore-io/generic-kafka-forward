export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

export enum Style {
  BOLD = 1,
  THIN = 2,
  ITALIC = 3,
  PURPLE = 35,
  CYAN = 36,
  GREEN = 32,
  YELLOW = 33,
  RED = 31,
  GRAY = 90,
}

const PREFIX = "\x1b"

export const colorize = (text: string, style: Style[]) => {
  if (!style.length) {
    return text
  }
  return `${PREFIX}[${style.join(";")}m${text}${PREFIX}[0m`
}
