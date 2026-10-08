import { MetricItem } from '@/src/features/admin/components/dashboard/metric-item'
import { formatHeadlineMoney, percentChange } from '@/src/features/admin/lib/dashboard-metrics'
import type { AdminDashboard } from '@/src/types/api/admin-dashboard'

const amount = (value: { amount: string } | null): number => (value ? Number(value.amount) : 0)

type MetricsStripProps = {
  dashboard: AdminDashboard
  /** The period picker, at the start of the strip. */
  picker: React.ReactNode
}

/** The chosen period at a glance, against the one before: sales, orders and average order. */
export function MetricsStrip({ dashboard, picker }: MetricsStripProps) {
  const { sales, orders, averageOrder } = dashboard

  return (
    <section aria-label="Resumen del período" className="flex flex-col gap-3 py-1 md:flex-row md:items-center md:gap-4">
      {picker}
      <div className="no-scrollbar flex flex-1 divide-x overflow-x-auto md:justify-center">
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
