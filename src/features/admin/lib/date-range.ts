/**
 * Date ranges of the admin home, as Argentine calendar days ("2026-10-08", both ends included). Day arithmetic runs
 * on UTC dates on purpose: these are calendar days, not instants, so no time zone can shift them.
 */
export type DayRange = { from: string; to: string }
export type LastUnit = 'days' | 'weeks' | 'months'

const AR_OFFSET_MS = 3 * 60 * 60 * 1000
export const MAX_RANGE_DAYS = 366

const toDate = (day: string): Date => new Date(`${day}T00:00:00Z`)
const toDay = (date: Date): string => date.toISOString().slice(0, 10)

/** Today in Argentina. */
export function argentineToday(now: Date = new Date()): string {
  return new Date(now.getTime() - AR_OFFSET_MS).toISOString().slice(0, 10)
}

export function addDays(day: string, amount: number): string {
  const date = toDate(day)
  date.setUTCDate(date.getUTCDate() + amount)
  return toDay(date)
}

/** Same day `amount` months away, clamped to the month's end (31 Mar − 1 month = 28/29 Feb). */
export function addMonths(day: string, amount: number): string {
  const date = toDate(day)
  const target = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1))
  const lastDay = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate()
  target.setUTCDate(Math.min(date.getUTCDate(), lastDay))
  return toDay(target)
}

export function rangeLength(range: DayRange): number {
  return Math.round((toDate(range.to).getTime() - toDate(range.from).getTime()) / 86_400_000) + 1
}

/** "Último N días/semanas/meses", ending today or yesterday. */
export function lastRange(today: string, amount: number, unit: LastUnit, includeToday: boolean): DayRange {
  const to = includeToday ? today : addDays(today, -1)
  const from =
    unit === 'months' ? addDays(addMonths(to, -amount), 1) : addDays(to, -(amount * (unit === 'weeks' ? 7 : 1)) + 1)
  return { from, to }
}

export type PeriodToDate = 'week' | 'month' | 'quarter' | 'year'

/** From the start of this week (Monday), month, quarter or year until today. */
export function periodToDate(today: string, period: PeriodToDate): DayRange {
  const date = toDate(today)
  const [year, month] = [date.getUTCFullYear(), date.getUTCMonth()]
  const start = {
    week: addDays(today, -((date.getUTCDay() + 6) % 7)),
    month: toDay(new Date(Date.UTC(year, month, 1))),
    quarter: toDay(new Date(Date.UTC(year, month - (month % 3), 1))),
    year: toDay(new Date(Date.UTC(year, 0, 1))),
  }[period]
  return { from: start, to: today }
}

/** The current quarter (to date) and the three before it, newest first. */
export function recentQuarters(today: string): { label: string; range: DayRange }[] {
  const date = toDate(today)
  const firstMonth = date.getUTCMonth() - (date.getUTCMonth() % 3)
  return Array.from({ length: 4 }, (_, index) => {
    const start = new Date(Date.UTC(date.getUTCFullYear(), firstMonth - index * 3, 1))
    const end = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 3, 0))
    const to = toDay(end) > today ? today : toDay(end)
    return {
      label: `${Math.floor(start.getUTCMonth() / 3) + 1}.º trimestre ${start.getUTCFullYear()}`,
      range: { from: toDay(start), to },
    }
  })
}

const monthName = new Intl.DateTimeFormat('es-AR', { month: 'short', timeZone: 'UTC' })

/** "8 oct" (and " 2026" when asked), without the "de" that es-AR puts between parts. */
function shortDay(day: string, withYear: boolean): string {
  const date = toDate(day)
  const month = monthName.format(date).replace('.', '')
  return `${date.getUTCDate()} ${month}${withYear ? ` ${date.getUTCFullYear()}` : ''}`
}

/** "8 sept–8 oct 2026", "3 dic 2025–8 oct 2026" or a single day. */
export function formatRange(range: DayRange): string {
  if (range.from === range.to) return shortDay(range.to, true)
  const sameYear = range.from.slice(0, 4) === range.to.slice(0, 4)
  return `${shortDay(range.from, !sameYear)}–${shortDay(range.to, true)}`
}

/** Name of a range for the trigger: "Hoy", "Ayer", "Últimos 30 días" or its dates. */
export function describeRange(range: DayRange, today: string): string {
  if (range.from === today && range.to === today) return 'Hoy'
  const yesterday = addDays(today, -1)
  if (range.from === yesterday && range.to === yesterday) return 'Ayer'
  if (range.to === today) return `Últimos ${rangeLength(range)} días`
  return formatRange(range)
}

/** A valid range for the API: real days, in order, not in the future, at most a year. */
export function isValidRange(range: DayRange, today: string): boolean {
  const day = /^\d{4}-\d{2}-\d{2}$/
  return (
    day.test(range.from) &&
    day.test(range.to) &&
    toDay(toDate(range.from)) === range.from &&
    toDay(toDate(range.to)) === range.to &&
    range.from <= range.to &&
    range.to <= today &&
    rangeLength(range) <= MAX_RANGE_DAYS
  )
}

/** Weeks of a month (Monday first) as days, with null for the blanks before the 1st and after the last day. */
export function monthGrid(year: number, month: number): (string | null)[][] {
  const first = new Date(Date.UTC(year, month, 1))
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
  const lead = (first.getUTCDay() + 6) % 7
  const cells: (string | null)[] = [
    ...Array<null>(lead).fill(null),
    ...Array.from({ length: days }, (_, index) => toDay(new Date(Date.UTC(year, month, index + 1)))),
  ]
  while (cells.length % 7) cells.push(null)
  return Array.from({ length: cells.length / 7 }, (_, week) => cells.slice(week * 7, week * 7 + 7))
}
