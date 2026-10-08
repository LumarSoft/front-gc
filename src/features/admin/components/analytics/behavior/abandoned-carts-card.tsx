import { ProductStatRow } from '@/src/features/admin/components/analytics/product-stat-row'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { MetricChange } from '@/src/features/admin/components/dashboard/metric-change'
import { pluralize } from '@/src/features/admin/lib/analytics-display'
import { percentChange } from '@/src/features/admin/lib/dashboard-metrics'
import type { AdminBehavior } from '@/src/types/api/admin-behavior'

/** Carts left without an order, and the products left behind most. */
export function AbandonedCartsCard({ carts }: { carts: AdminBehavior['carts'] }) {
  const { abandoned, ordersPlaced, abandonAfterHours, products } = carts
  const max = Math.max(...products.map(product => product.carts), 0)

  return (
    <AdminCard
      title="Carritos abandonados"
      aside={
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          {pluralize(abandoned.current, 'carrito', 'carritos')}
          {(abandoned.current > 0 || abandoned.previous > 0) && (
            <MetricChange change={percentChange(abandoned.current, abandoned.previous)} good="down" empty="Nuevo" />
          )}
        </span>
      }
    >
      <p className="text-sm text-muted-foreground">
        En el período se hicieron {pluralize(ordersPlaced.current, 'pedido', 'pedidos')} y quedaron{' '}
        {pluralize(abandoned.current, 'carrito', 'carritos')} sin terminar: con productos, sin pedido y sin cambios hace
        más de {abandonAfterHours} h.
      </p>
      {products.length > 0 && (
        <>
          <h3 className="mt-4 text-xs font-medium text-muted-foreground">Lo que más quedó en los carritos</h3>
          <ol className="-mx-4 mt-1 divide-y">
            {products.map((product, index) => (
              <ProductStatRow
                key={product.id}
                rank={index + 1}
                product={product}
                value={pluralize(product.carts, 'carrito', 'carritos')}
                ratio={max > 0 ? product.carts / max : 0}
                detail={pluralize(product.units, 'unidad', 'unidades')}
              />
            ))}
          </ol>
        </>
      )}
    </AdminCard>
  )
}
