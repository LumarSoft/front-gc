import { ProductStatRow } from '@/src/features/admin/components/analytics/product-stat-row'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { pluralize } from '@/src/features/admin/lib/analytics-display'
import type { AdminBehavior } from '@/src/types/api/admin-behavior'

/** Most viewed products, next to how many visitors added them and how many units sold: interest vs. sales. */
export function ViewedProductsCard({ products }: { products: AdminBehavior['products'] }) {
  const max = Math.max(...products.map(product => product.viewers), 0)

  return (
    <AdminCard
      title="Productos más vistos"
      aside={<span className="text-xs text-muted-foreground">Visitantes únicos</span>}
    >
      {products.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Nadie vio productos en este período.</p>
      ) : (
        <ol className="-mx-4 divide-y">
          {products.map((product, index) => (
            <ProductStatRow
              key={product.id}
              rank={index + 1}
              product={product}
              value={pluralize(product.viewers, 'visitante', 'visitantes')}
              ratio={max > 0 ? product.viewers / max : 0}
              detail={`${pluralize(product.addedToCart, 'lo agregó', 'lo agregaron')} al carrito`}
              aside={<span>{pluralize(product.unitsSold, 'vendida', 'vendidas')}</span>}
            />
          ))}
        </ol>
      )}
    </AdminCard>
  )
}
