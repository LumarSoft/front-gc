import type { BarListRow } from '@/src/features/admin/components/analytics/bar-list'
import { amountOf, pluralize, share } from '@/src/features/admin/lib/analytics-display'
import { formatHeadlineMoney, percentChange } from '@/src/features/admin/lib/dashboard-metrics'
import type { AnalyticsMixRow, AnalyticsRankRow } from '@/src/types/api/admin-analytics'

/** Sales per payment method, buyer type…: amount, orders and share of the period's sales, change vs before. */
export function mixRows<K extends string>(rows: AnalyticsMixRow<K>[], labels: Record<K, string>): BarListRow[] {
  const total = rows.reduce((sum, row) => sum + amountOf(row.sales), 0)
  return rows.map(row => ({
    key: row.key,
    label: labels[row.key],
    value: amountOf(row.sales),
    display: formatHeadlineMoney(row.sales),
    detail: `${pluralize(row.orders, 'pedido', 'pedidos')} · ${share(amountOf(row.sales), total)} % de las ventas`,
    change: percentChange(amountOf(row.sales), amountOf(row.previousSales)),
  }))
}

/** Sales per category or brand, with units sold and the change vs the previous period. */
export function rankRows(rows: AnalyticsRankRow[]): BarListRow[] {
  return rows.map(row => ({
    key: String(row.id),
    label: row.name,
    value: amountOf(row.sales),
    display: formatHeadlineMoney(row.sales),
    detail: pluralize(row.units, 'unidad vendida', 'unidades vendidas'),
    change: percentChange(amountOf(row.sales), amountOf(row.previousSales)),
  }))
}
