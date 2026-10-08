import { formatMoneyExact } from '@/src/lib/format'
import type { Money } from '@/src/types/api/money'

/** Change against the previous period in whole percent; null when there is nothing to compare with. */
export function percentChange(current: number, previous: number): number | null {
  if (previous === 0) return null
  return Math.round(((current - previous) / previous) * 100)
}

/** "+72 %", "−7 %", "0 %" (true minus sign, Argentine spacing). */
export function formatChange(change: number): string {
  if (change === 0) return '0 %'
  return `${change > 0 ? '+' : '−'}${Math.abs(change)} %`
}

const compact = new Intl.NumberFormat('es-AR', { notation: 'compact', maximumFractionDigits: 2 })

/** Headline amount: "17,59 M ARS" for big sales, exact pesos below a hundred thousand. */
export function formatHeadlineMoney(money: Money): string {
  const amount = Number(money.amount)
  return amount >= 100_000 ? `${compact.format(amount)} ${money.currency}` : formatMoneyExact(money)
}

const dayLabel = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short', timeZone: 'UTC' })

/** "8 oct." for an API day ("2026-10-08"). The day is a calendar date, so it is read in UTC on purpose. */
export function formatDay(day: string): string {
  return dayLabel.format(new Date(`${day}T00:00:00Z`))
}
