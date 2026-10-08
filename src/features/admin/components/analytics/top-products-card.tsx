'use client'

import { useState } from 'react'
import { ProductStatRow } from '@/src/features/admin/components/analytics/product-stat-row'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { SegmentedControl } from '@/src/features/admin/components/common/segmented-control'
import { MetricChange } from '@/src/features/admin/components/dashboard/metric-change'
import { amountOf, pluralize } from '@/src/features/admin/lib/analytics-display'
import { formatHeadlineMoney, percentChange } from '@/src/features/admin/lib/dashboard-metrics'
import type { AnalyticsProductRow } from '@/src/types/api/admin-analytics'

type Ranking = 'sales' | 'units'

const RANKINGS: { value: Ranking; label: string }[] = [
  { value: 'sales', label: 'Facturación' },
  { value: 'units', label: 'Unidades' },
]

type TopProductsCardProps = {
  bySales: AnalyticsProductRow[]
  byUnits: AnalyticsProductRow[]
}

/**
 * The period's best sellers by sales or by units (a plotter sold once tops the sales; ink tops the units), with the
 * change against the previous period in the same measure.
 */
export function TopProductsCard({ bySales, byUnits }: TopProductsCardProps) {
  const [ranking, setRanking] = useState<Ranking>('sales')
  const products = ranking === 'sales' ? bySales : byUnits
  const measure = (product: AnalyticsProductRow) => (ranking === 'sales' ? amountOf(product.sales) : product.units)
  const max = Math.max(...products.map(measure), 0)

  return (
    <AdminCard
      title="Productos más vendidos"
      aside={<SegmentedControl label="Ordenar por" options={RANKINGS} value={ranking} onChange={setRanking} />}
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
              value={
                ranking === 'sales'
                  ? formatHeadlineMoney(product.sales)
                  : pluralize(product.units, 'unidad', 'unidades')
              }
              ratio={max > 0 ? measure(product) / max : 0}
              detail={
                ranking === 'sales'
                  ? pluralize(product.units, 'unidad', 'unidades')
                  : formatHeadlineMoney(product.sales)
              }
              aside={
                <MetricChange
                  change={
                    ranking === 'sales'
                      ? percentChange(amountOf(product.sales), amountOf(product.previousSales))
                      : percentChange(product.units, product.previousUnits)
                  }
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
