const TIME_ZONE = 'America/Argentina/Buenos_Aires'
const time = new Intl.DateTimeFormat('es-AR', {
  hour: 'numeric',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZone: TIME_ZONE,
})
const dayMonth = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short', timeZone: TIME_ZONE })
const dayMonthYear = new Intl.DateTimeFormat('es-AR', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: TIME_ZONE,
})
const dayKey = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE })
const relative = new Intl.RelativeTimeFormat('es-AR', { numeric: 'auto' })

/** "Hoy a las 18:35", "Ayer a las 9:40", "Mañana a las 21:39", "6 oct. a las 19:36" (with the year when it is not this one). */
export function formatOrderDate(iso: string, now: Date = new Date()): string {
  const date = new Date(iso)
  const days = Math.round((Date.parse(dayKey.format(now)) - Date.parse(dayKey.format(date))) / 86_400_000)
  const at = `a las ${time.format(date)}`
  if (days === 0) return `Hoy ${at}`
  if (days === 1) return `Ayer ${at}`
  if (days === -1) return `Mañana ${at}`
  const sameYear = date.getFullYear() === now.getFullYear()
  return `${(sameYear ? dayMonth : dayMonthYear).format(date)} ${at}`
}

/** "en 5 horas", "en 20 minutos", "hace 2 horas". */
export function formatFromNow(iso: string, now: Date = new Date()): string {
  const minutes = Math.round((Date.parse(iso) - now.getTime()) / 60_000)
  if (Math.abs(minutes) < 60) return relative.format(minutes, 'minute')
  const hours = Math.round(minutes / 60)
  if (Math.abs(hours) < 48) return relative.format(hours, 'hour')
  return relative.format(Math.round(hours / 24), 'day')
}
