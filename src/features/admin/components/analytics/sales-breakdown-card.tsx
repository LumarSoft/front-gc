import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { MetricChange } from '@/src/features/admin/components/dashboard/metric-change'
import { amountOf } from '@/src/features/admin/lib/analytics-display'
import { percentChange } from '@/src/features/admin/lib/dashboard-metrics'
import { formatMoneyExact } from '@/src/lib/format'
import { cn } from '@/src/lib/utils'
import type { AdminAnalytics, Compared } from '@/src/types/api/admin-analytics'
import type { Money } from '@/src/types/api/money'

type Line = { label: string; value: Compared<Money>; sign?: '−' | '+'; total?: boolean }

/** What the sales are made of, against the previous period: products − discounts + shipping = sales. */
export function SalesBreakdownCard({ analytics }: { analytics: AdminAnalytics }) {
  const { breakdown, sales } = analytics
  const lines: Line[] = [
    { label: 'Productos', value: breakdown.products },
    { label: 'Descuentos', value: breakdown.discounts, sign: '−' },
    { label: 'Envíos', value: breakdown.shipping, sign: '+' },
    { label: 'Ventas', value: sales, total: true },
  ]

  return (
    <AdminCard title="Desglose de ventas">
      <table className="w-full text-sm">
        <thead className="sr-only">
          <tr>
            <th scope="col">Concepto</th>
            <th scope="col">Período</th>
            <th scope="col">Cambio</th>
          </tr>
        </thead>
        <tbody>
          {lines.map(line => (
            <tr key={line.label} className={cn(line.total && 'border-t font-semibold')}>
              <th scope="row" className={cn('py-2 text-left font-normal', line.total && 'font-semibold')}>
                {line.label}
              </th>
              <td className="py-2 text-right tabular-nums">
                {line.sign && amountOf(line.value.current) > 0 && (
                  <span className="text-muted-foreground">{line.sign} </span>
                )}
                {formatMoneyExact(line.value.current)}
              </td>
              <td className="w-20 py-2 text-right">
                {amountOf(line.value.current) === 0 && amountOf(line.value.previous) === 0 ? (
                  <span className="text-xs text-muted-foreground">—</span>
                ) : (
                  <MetricChange
                    change={percentChange(amountOf(line.value.current), amountOf(line.value.previous))}
                    good={line.total ? 'up' : 'neither'}
                    empty="Nuevo"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-muted-foreground">
        Pedidos pagados del período, por fecha de pago. Un pedido cancelado después de pagar no cuenta.
      </p>
    </AdminCard>
  )
}
