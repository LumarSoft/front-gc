import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { AreaChart } from '@/src/features/admin/components/dashboard/area-chart'
import { MetricChange } from '@/src/features/admin/components/dashboard/metric-change'
import { formatDay, formatHeadlineMoney, percentChange } from '@/src/features/admin/lib/dashboard-metrics'
import { formatMoneyExact } from '@/src/lib/format'
import type { AdminDashboard } from '@/src/types/api/admin-dashboard'

/** Paid sales of the last 30 days, day by day. */
export function SalesCard({ dashboard }: { dashboard: AdminDashboard }) {
  const { sales, days } = dashboard
  const currency = sales.current.currency

  return (
    <AdminCard title="Ventas" aside={<span className="text-xs text-muted-foreground">Pedidos pagados</span>}>
      <div className="mb-4 flex items-baseline gap-3">
        <span className="text-2xl font-semibold tracking-tight tabular-nums">{formatHeadlineMoney(sales.current)}</span>
        <MetricChange change={percentChange(Number(sales.current.amount), Number(sales.previous.amount))} />
      </div>
      <AreaChart
        title="Ventas por día del período"
        values={sales.daily.map(Number)}
        labels={days.map(formatDay)}
        formatValue={value => formatMoneyExact({ amount: value.toFixed(2), currency })}
        formatAxis={value => formatHeadlineMoney({ amount: value.toFixed(2), currency })}
      />
    </AdminCard>
  )
}
