'use client'

import Link from 'next/link'
import { HandbagIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { EmptyState } from '@/src/components/ui/empty-state'
import { CartItemRow } from '@/src/features/cart/components/cart-item-row'
import { CartSkeleton } from '@/src/features/cart/components/cart-skeleton'
import { CartSummary } from '@/src/features/cart/components/cart-summary'
import {
  useCart,
  useCartBusy,
  useClearCart,
  useRemoveCartItem,
  useSetCartQuantity,
} from '@/src/features/cart/hooks/use-cart'
import { cartErrorMessage } from '@/src/features/cart/lib/cart-messages'

export function CartView() {
  const query = useCart()
  const quantity = useSetCartQuantity()
  const remove = useRemoveCartItem()
  const clear = useClearCart()
  const pending = useCartBusy()
  const error = quantity.error ?? remove.error ?? clear.error

  if (query.isPending) return <CartSkeleton />
  if (query.isError)
    return (
      <div className="rounded-3xl border p-8 text-center">
        <p role="alert">No pudimos cargar tu carrito. Revisá tu conexión y probá de nuevo.</p>
        <Button className="mt-5 rounded-full" onClick={() => void query.refetch()}>
          Reintentar
        </Button>
      </div>
    )
  const cart = query.data
  if (!cart.items.length)
    return (
      <div className="rounded-3xl border">
        <EmptyState
          icon={<HandbagIcon />}
          title="Tu carrito está esperando ideas"
          description="Elegí una impresora, tintas o insumos y agregalos desde la página del producto."
          action={
            <Button asChild className="rounded-full">
              <Link href="/productos">Explorar productos</Link>
            </Button>
          }
        />
      </div>
    )

  const resetErrors = (): void => {
    quantity.reset()
    remove.reset()
    clear.reset()
  }
  return (
    <div className="grid items-start gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
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
              onQuantity={(variantId, value) => {
                resetErrors()
                quantity.mutate({ variantId, quantity: value })
              }}
              onRemove={variantId => {
                resetErrors()
                remove.mutate(variantId)
              }}
            />
          ))}
        </ul>
        <Button
          variant="ghost"
          disabled={pending}
          onClick={() => {
            resetErrors()
            clear.mutate()
          }}
        >
          Vaciar carrito
        </Button>
      </div>
      <CartSummary cart={cart} />
    </div>
  )
}
