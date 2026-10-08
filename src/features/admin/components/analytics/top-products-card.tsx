import Link from 'next/link'
import { PackageIcon } from '@phosphor-icons/react/dist/ssr'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { ItemThumb } from '@/src/features/admin/components/common/item-thumb'
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
            <li key={product.id} className="flex items-start gap-3 px-4 py-2.5">
              <span className="mt-2 w-4 shrink-0 text-right text-xs text-muted-foreground tabular-nums">
                {index + 1}
              </span>
              <ItemThumb url={product.imageUrl} fallbackIcon={PackageIcon} size="sm" />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-baseline justify-between gap-3">
                  {product.archived ? (
                    <span className="line-clamp-2 text-sm">{product.name} (archivado)</span>
                  ) : (
                    <Link href={`/admin/productos/${product.id}`} className="line-clamp-2 text-sm hover:underline">
                      {product.name}
                    </Link>
                  )}
                  <span className="shrink-0 text-sm font-medium tabular-nums">
                    {formatHeadlineMoney(product.sales)}
                  </span>
                </div>
                {/* Full-width track in every row, so bar lengths compare across rows. */}
                <div className="h-1.5 rounded-full bg-chart-track">
                  <div
                    className="h-full rounded-full bg-chart-series"
                    style={{ width: `${max > 0 ? (amountOf(product.sales) / max) * 100 : 0}%` }}
                  />
                </div>
                <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                  <span>{pluralize(product.units, 'unidad', 'unidades')}</span>
                  <MetricChange
                    change={percentChange(amountOf(product.sales), amountOf(product.previousSales))}
                    empty="Nuevo"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </AdminCard>
  )
}
