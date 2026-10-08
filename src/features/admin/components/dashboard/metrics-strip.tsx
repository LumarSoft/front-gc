import { MetricItem } from '@/src/features/admin/components/dashboard/metric-item'
import { formatHeadlineMoney, percentChange } from '@/src/features/admin/lib/dashboard-metrics'
import type { AdminDashboard } from '@/src/types/api/admin-dashboard'

const amount = (value: { amount: string } | null): number => (value ? Number(value.amount) : 0)

/** The last 30 days at a glance, against the 30 before: sales, orders and average order. */
export function MetricsStrip({ dashboard }: { dashboard: AdminDashboard }) {
  const { sales, orders, averageOrder } = dashboard

  return (
    <section
      aria-label="Resumen de los últimos 30 días"
      className="no-scrollbar flex items-center gap-4 overflow-x-auto py-1"
    >
      <p className="shrink-0 text-sm text-muted-foreground max-md:hidden">Últimos 30 días</p>
      <div className="flex flex-1 divide-x md:justify-center">
        <MetricItem
          label="Ventas"
          value={formatHeadlineMoney(sales.current)}
          change={percentChange(amount(sales.current), amount(sales.previous))}
          trend={sales.daily.map(Number)}
        />
        <MetricItem
          label="Pedidos"
          value={String(orders.current)}
          change={percentChange(orders.current, orders.previous)}
          trend={orders.daily}
        />
        <MetricItem
          label="Ticket promedio"
          value={averageOrder.current ? formatHeadlineMoney(averageOrder.current) : '—'}
          change={
            averageOrder.current && averageOrder.previous
              ? percentChange(amount(averageOrder.current), amount(averageOrder.previous))
              : null
          }
        />
      </div>
    </section>
  )
}
