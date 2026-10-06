'use client'

import Link from 'next/link'
import { HandbagIcon } from '@phosphor-icons/react'
import { cn } from '@/src/lib/utils'
import { Button } from '@/src/components/ui/button'
import { EmptyState } from '@/src/components/ui/empty-state'
import { CartItemRow } from '@/src/features/cart/components/cart-item-row'
import { CartSkeleton } from '@/src/features/cart/components/cart-skeleton'
import { CartSummary } from '@/src/features/cart/components/cart-summary'
import { useCartControls } from '@/src/features/cart/hooks/use-cart-controls'
import { cartErrorMessage } from '@/src/features/cart/lib/cart-messages'

export function CartView({ drawer = false, onContinue }: { drawer?: boolean; onContinue?: () => void }) {
  const { query, pending, error, setQuantity, removeItem, clearCart } = useCartControls()

  if (query.isPending) return <CartSkeleton drawer={drawer} />
  if (query.isError)
    return (
      <div className={cn('rounded-3xl border p-8 text-center', drawer && 'm-5')}>
        <p role="alert">No pudimos cargar tu carrito. Revisá tu conexión y probá de nuevo.</p>
        <Button className="mt-5 rounded-full" onClick={() => void query.refetch()}>
          Reintentar
        </Button>
      </div>
    )
  const cart = query.data
  if (!cart.items.length)
    return (
      <div className={cn('rounded-3xl border', drawer && 'm-5 overflow-y-auto')}>
        <EmptyState
          icon={<HandbagIcon />}
          title="Tu carrito está esperando ideas"
          description="Elegí una impresora, tintas o insumos y agregalos desde la página del producto."
          action={
            drawer ? (
              <Button className="rounded-full" onClick={onContinue}>
                Seguir eligiendo
              </Button>
            ) : (
              <Button asChild className="rounded-full">
                <Link href="/productos">Explorar productos</Link>
              </Button>
            )
          }
        />
      </div>
    )

  return (
    <div className={cn(drawer ? 'flex min-h-0 flex-1 flex-col' : 'grid items-start gap-6 lg:grid-cols-3')}>
      <div
        className={cn(
          'space-y-4',
          drawer ? 'min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6' : 'lg:col-span-2',
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" role="status">
            {cart.itemCount} {cart.itemCount === 1 ? 'unidad en tu carrito' : 'unidades en tu carrito'}
          </p>
          <Button variant="ghost" size="sm" disabled={pending || query.isFetching} onClick={() => void query.refetch()}>
            Actualizar precios y stock
          </Button>
        </div>
        {error && (
          <p className="rounded-xl border border-destructive p-4 text-sm text-destructive" role="alert">
            {cartErrorMessage(error)}
          </p>
        )}
        <ul className="space-y-4">
          {cart.items.map(item => (
            <CartItemRow
              key={item.variantId}
              item={item}
              pending={pending}
              compact={drawer}
              onNavigate={onContinue}
              onQuantity={setQuantity}
              onRemove={removeItem}
            />
          ))}
        </ul>
        <Button variant="ghost" disabled={pending} onClick={clearCart}>
          Vaciar carrito
        </Button>
      </div>
      <CartSummary cart={cart} drawer={drawer} onContinue={onContinue} />
    </div>
  )
}
