import { BarList, type BarListRow } from '@/src/features/admin/components/analytics/bar-list'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { MetricChange } from '@/src/features/admin/components/dashboard/metric-change'
import { formatHours, pluralize, share } from '@/src/features/admin/lib/analytics-display'
import { percentChange } from '@/src/features/admin/lib/dashboard-metrics'
import type { AdminAnalytics, OrderOutcomes } from '@/src/types/api/admin-analytics'

const OUTCOMES: { key: Exclude<keyof OrderOutcomes, 'placed'>; label: string }[] = [
  { key: 'paid', label: 'Pagados' },
  { key: 'waiting', label: 'Esperando el pago' },
  { key: 'expired', label: 'Vencieron sin pagar' },
  { key: 'cancelled', label: 'Cancelados' },
]

/** What became of the orders placed in the period, and how long payments take. */
export function OrderOutcomesCard({ analytics }: { analytics: AdminAnalytics }) {
  const { outcomes, hoursToPay } = analytics
  const { current } = outcomes
  const rows: BarListRow[] = (current.placed === 0 ? [] : OUTCOMES)
    .filter(({ key }) => key !== 'waiting' || current.waiting > 0)
    .map(({ key, label }) => ({
      key,
      label,
      value: current[key],
      display: `${current[key]} · ${share(current[key], current.placed)} %`,
    }))

  return (
    <AdminCard
      title="Qué pasó con los pedidos"
      aside={
        <span className="text-xs text-muted-foreground">
          {pluralize(current.placed, 'pedido realizado', 'pedidos realizados')}
        </span>
      }
    >
      <BarList rows={rows} empty="No se hicieron pedidos en este período." />
      {hoursToPay.current !== null && (
        <p className="mt-4 flex flex-wrap items-center gap-x-1.5 border-t pt-3 text-sm">
          <span>
            La mitad de los pagos se confirma en menos de{' '}
            <span className="font-semibold">{formatHours(hoursToPay.current)}</span>.
          </span>
          {hoursToPay.previous !== null && (
            <MetricChange change={percentChange(hoursToPay.current, hoursToPay.previous)} good="down" />
          )}
        </p>
      )}
    </AdminCard>
  )
}
