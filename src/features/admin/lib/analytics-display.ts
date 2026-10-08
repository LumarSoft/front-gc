import { formatDay } from '@/src/features/admin/lib/dashboard-metrics'
import { formatRange } from '@/src/features/admin/lib/date-range'
import type { BuyerType } from '@/src/types/api/auth'
import type { DeliveryMethod } from '@/src/types/api/checkout'
import type { AnalyticsBucket, AnalyticsGroupBy, PaymentMethod } from '@/src/types/api/admin-analytics'
import type { Money } from '@/src/types/api/money'

/** Spanish URL values for the grouping (`?por=semana`). */
export const GROUP_BY_PARAM: Record<AnalyticsGroupBy, string> = { day: 'dia', week: 'semana', month: 'mes' }

/** Tabs of the stats page: sales (orders) and visits (anonymous store activity). */
export type AnalyticsView = 'sales' | 'visits'

export const VIEW_PARAM: Record<AnalyticsView, string> = { sales: 'ventas', visits: 'visitas' }

export const viewFromParam = (value: string | null): AnalyticsView => (value === VIEW_PARAM.visits ? 'visits' : 'sales')

export const GROUP_BY_LABEL: Record<AnalyticsGroupBy, string> = { day: 'Día', week: 'Semana', month: 'Mes' }

export function groupByFromParam(value: string | null): AnalyticsGroupBy | undefined {
  return (Object.keys(GROUP_BY_PARAM) as AnalyticsGroupBy[]).find(key => GROUP_BY_PARAM[key] === value)
}

export const BUYER_TYPE_LABEL: Record<BuyerType, string> = { RETAIL: 'Minoristas', WHOLESALE: 'Clientes frecuentes' }

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  MANUAL: 'Coordinado con la tienda',
  MERCADO_PAGO: 'Mercado Pago',
  BANK_TRANSFER: 'Transferencia',
  CURRENT_ACCOUNT: 'Cuenta corriente',
}

export const DELIVERY_METHOD_LABEL: Record<DeliveryMethod, string> = {
  STORE_PICKUP: 'Retiro en el local',
  LOCAL_DELIVERY: 'Envío en Rosario',
  CARRIER: 'Envío por transporte',
}

const monthLabel = new Intl.DateTimeFormat('es-AR', { month: 'short', year: 'numeric', timeZone: 'UTC' })

/** Axis label of a chart point: "8 oct.", the week's first day, or "oct 2026". */
export function bucketLabel(bucket: AnalyticsBucket, groupBy: AnalyticsGroupBy): string {
  if (groupBy === 'month') return monthLabel.format(new Date(`${bucket.start}T00:00:00Z`)).replace('.', '')
  return formatDay(bucket.start)
}

/** Days a point covers, for the tooltip: "8 oct 2026" or "5–11 oct 2026". */
export const bucketRange = (bucket: AnalyticsBucket): string => formatRange({ from: bucket.start, to: bucket.end })

export const previousBucketRange = (bucket: AnalyticsBucket): string =>
  formatRange({ from: bucket.previousStart, to: bucket.previousEnd })

/** Share of a total in whole percent ("43 %"); 0 when the total is zero. */
export function share(part: number, total: number): number {
  return total > 0 ? Math.round((part / total) * 100) : 0
}

export const amountOf = (money: Money | null): number => (money ? Number(money.amount) : 0)

/** "3 h", "40 min" or "1,5 días": how long a payment takes. */
export function formatHours(hours: number): string {
  // Non-breaking spaces: the number and its unit never split across lines.
  if (hours < 1) return `${Math.max(1, Math.round(hours * 60))}\u00a0min`
  if (hours < 48) return `${new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 }).format(hours)}\u00a0h`
  return `${new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 }).format(hours / 24)}\u00a0días`
}

/** Which points get an axis label: both ends and up to three evenly spaced in between. */
export function axisTicks(count: number, most = 5): number[] {
  if (count <= 1) return count === 1 ? [0] : []
  const steps = Math.min(most, count) - 1
  return [...new Set(Array.from({ length: steps + 1 }, (_, step) => Math.round((step * (count - 1)) / steps)))]
}

const unitsFormat = new Intl.NumberFormat('es-AR')

/** "1 pedido", "14 pedidos". */
export const pluralize = (count: number, one: string, many: string): string =>
  `${unitsFormat.format(count)} ${count === 1 ? one : many}`

/** The period starts or ends in the middle of a week or month, so an end point adds up fewer days than the rest. */
export function hasPartialEnds(buckets: AnalyticsBucket[], groupBy: AnalyticsGroupBy): boolean {
  if (groupBy === 'day' || buckets.length === 0) return false
  const first = buckets[0]
  const last = buckets[buckets.length - 1]
  if (groupBy === 'week') {
    const weekday = (day: string) => new Date(`${day}T00:00:00Z`).getUTCDay()
    return weekday(first.start) !== 1 || weekday(last.end) !== 0
  }
  const nextDay = new Date(Date.parse(`${last.end}T00:00:00Z`) + 86_400_000).getUTCDate()
  return !first.start.endsWith('-01') || nextDay !== 1
}
