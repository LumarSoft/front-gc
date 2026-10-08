import { Card } from '@/src/components/ui/card'
import { KpiTile } from '@/src/features/admin/components/analytics/kpi-tile'
import { amountOf, share } from '@/src/features/admin/lib/analytics-display'
import { formatHeadlineMoney, percentChange } from '@/src/features/admin/lib/dashboard-metrics'
import type { AdminAnalytics } from '@/src/types/api/admin-analytics'

/** The period at a glance: sales, paid orders, average order and how many buyers came back. */
export function AnalyticsKpis({ analytics }: { analytics: AdminAnalytics }) {
  const { sales, orders, averageOrder, customers } = analytics
  const returningShare = (period: 'current' | 'previous') => share(customers.returning[period], customers.total[period])

  return (
    <Card className="grid grid-cols-2 gap-0 divide-border py-0 lg:grid-cols-4 lg:divide-x max-lg:[&>*:nth-child(-n+2)]:border-b max-lg:[&>*:nth-child(odd)]:border-r">
      <KpiTile
        label="Ventas"
        value={formatHeadlineMoney(sales.current)}
        change={percentChange(amountOf(sales.current), amountOf(sales.previous))}
        hint="pedidos pagados"
        trend={sales.series.current.map(Number)}
      />
      <KpiTile
        label="Pedidos pagados"
        value={String(orders.current)}
        change={percentChange(orders.current, orders.previous)}
        hint="vs. período anterior"
        trend={orders.series.current}
      />
      <KpiTile
        label="Ticket promedio"
        value={averageOrder.current ? formatHeadlineMoney(averageOrder.current) : '—'}
        change={
          averageOrder.current && averageOrder.previous
            ? percentChange(amountOf(averageOrder.current), amountOf(averageOrder.previous))
            : null
        }
        hint="por pedido pagado"
      />
      <KpiTile
        label="Clientes que vuelven"
        value={customers.total.current > 0 ? `${returningShare('current')} %` : '—'}
        change={
          customers.total.current > 0 && customers.total.previous > 0
            ? returningShare('current') - returningShare('previous')
            : null
        }
        changeUnit="pp"
        hint={`de ${customers.total.current} que compraron`}
      />
    </Card>
  )
}
