import { ProductStatRow } from '@/src/features/admin/components/analytics/product-stat-row'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { MetricChange } from '@/src/features/admin/components/dashboard/metric-change'
import { amountOf, pluralize } from '@/src/features/admin/lib/analytics-display'
import { formatHeadlineMoney, percentChange } from '@/src/features/admin/lib/dashboard-metrics'
import type { AnalyticsProductRow } from '@/src/types/api/admin-analytics'

/** The period's best sellers by sales, with units and the change against the previous period. */
export function TopProductsCard({ products }: { products: AnalyticsProductRow[] }) {
  const max = Math.max(...products.map(product => amountOf(product.sales)), 0)

  return (
    <AdminCard
      title="Productos más vendidos"
      aside={<span className="text-xs text-muted-foreground">Por facturación</span>}
    >
      {products.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">No hubo ventas en este período.</p>
      ) : (
        <ol className="-mx-4 divide-y">
          {products.map((product, index) => (
            <ProductStatRow
              key={product.id}
              rank={index + 1}
              product={product}
              value={formatHeadlineMoney(product.sales)}
              ratio={max > 0 ? amountOf(product.sales) / max : 0}
              detail={pluralize(product.units, 'unidad', 'unidades')}
              aside={
                <MetricChange
                  change={percentChange(amountOf(product.sales), amountOf(product.previousSales))}
                  empty="Nuevo"
                />
              }
            />
          ))}
        </ol>
      )}
    </AdminCard>
  )
}
