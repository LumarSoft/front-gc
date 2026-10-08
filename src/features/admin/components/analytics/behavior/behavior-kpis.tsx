import { Card } from '@/src/components/ui/card'
import { KpiTile } from '@/src/features/admin/components/analytics/kpi-tile'
import { pluralize, share } from '@/src/features/admin/lib/analytics-display'
import { percentChange } from '@/src/features/admin/lib/dashboard-metrics'
import type { AdminBehavior } from '@/src/types/api/admin-behavior'

/** Share in whole percent, null when there is no base to compare with. */
const rate = (part: number, total: number): number | null => (total > 0 ? share(part, total) : null)
const pointsChange = (current: number | null, previous: number | null): number | null =>
  current !== null && previous !== null ? current - previous : null

/** The visits at a glance: visitors, how many bought, how many reached the cart, how many carts were left. */
export function BehaviorKpis({ behavior }: { behavior: AdminBehavior }) {
  const { visitors, funnel, carts } = behavior
  const conversion = (period: 'current' | 'previous') => rate(funnel[period].placedOrder, funnel[period].visited)
  const cartRate = (period: 'current' | 'previous') => rate(funnel[period].addedToCart, funnel[period].visited)
  const abandonment = (period: 'current' | 'previous') =>
    rate(carts.abandoned[period], carts.abandoned[period] + carts.ordersPlaced[period])
  const percent = (value: number | null) => (value === null ? '—' : `${value} %`)

  return (
    <Card className="grid grid-cols-2 gap-0 divide-border py-0 lg:grid-cols-4 lg:divide-x max-lg:[&>*:nth-child(-n+2)]:border-b max-lg:[&>*:nth-child(odd)]:border-r">
      <KpiTile
        label="Visitantes"
        value={new Intl.NumberFormat('es-AR').format(visitors.current)}
        change={percentChange(visitors.current, visitors.previous)}
        hint="únicos"
        trend={visitors.series.current}
      />
      <KpiTile
        label="Tasa de conversión"
        value={percent(conversion('current'))}
        change={pointsChange(conversion('current'), conversion('previous'))}
        changeUnit="pp"
        hint="hicieron un pedido"
      />
      <KpiTile
        label="Agregaron al carrito"
        value={percent(cartRate('current'))}
        change={pointsChange(cartRate('current'), cartRate('previous'))}
        changeUnit="pp"
        hint={`${pluralize(funnel.current.addedToCart, 'visitante', 'visitantes')}`}
      />
      <KpiTile
        label="Carritos abandonados"
        value={percent(abandonment('current'))}
        change={pointsChange(abandonment('current'), abandonment('previous'))}
        changeUnit="pp"
        good="down"
        hint={pluralize(carts.abandoned.current, 'carrito', 'carritos')}
      />
    </Card>
  )
}
