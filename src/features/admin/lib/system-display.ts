const bytes = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 })

/** "1,2 GB", "312 MB". */
export function formatBytes(value: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let size = value
  let unit = 0
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024
    unit += 1
  }
  return `${bytes.format(size)} ${units[unit]}`
}

/** "3 d 4 h", "2 h 15 min", "40 s". */
export function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86_400)
  const hours = Math.floor((seconds % 86_400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (days > 0) return `${days} d ${hours} h`
  if (hours > 0) return `${hours} h ${minutes} min`
  if (minutes > 0) return `${minutes} min`
  return `${seconds} s`
}

/** Share of `part` in `total`, 0–100. */
export const percent = (part: number, total: number): number => (total > 0 ? Math.round((part / total) * 100) : 0)
