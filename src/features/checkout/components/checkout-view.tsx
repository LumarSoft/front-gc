'use client'

import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { CartSkeleton } from '@/src/features/cart/components/cart-skeleton'
import { useCartDrawer } from '@/src/features/cart/hooks/use-cart-drawer'
import { useCheckout } from '../hooks/use-checkout'
import { CheckoutForm } from './checkout-form'
import { CheckoutSummary } from './checkout-summary'
import { CheckoutReview } from './checkout-review'

export function CheckoutView() {
  const { query, preview, pending, user, error } = useCheckout()
  const { openCart } = useCartDrawer()
  if (query.isPending) return <CartSkeleton />
  if (query.isError)
    return (
      <div className="rounded-3xl border p-8 text-center">
        <p role="alert">No pudimos preparar tu compra. Revisá tu conexión y probá de nuevo.</p>
        <Button className="mt-5 rounded-full" onClick={() => void query.refetch()}>
          Reintentar
        </Button>
      </div>
    )
  const checkout = query.data
  if (!checkout.cart.items.length)
    return (
      <div className="rounded-3xl border p-8 text-center">
        <h2 className="text-xl font-extrabold">Tu carrito está vacío</h2>
        <p className="mt-2 text-muted-foreground">Agregá productos para preparar tu compra.</p>
        <Button asChild className="mt-5 rounded-full">
          <Link href="/productos">Explorar productos</Link>
        </Button>
      </div>
    )
  return (
    <div className="grid items-start gap-8 lg:grid-cols-3">
      <div className="rounded-3xl border p-5 sm:p-8 lg:col-span-2">
        {checkout.cart.hasIssues && (
          <p role="alert" className="mb-6 rounded-xl border border-destructive p-4 text-sm text-destructive">
            Hay productos cuyo precio o stock cambió.{' '}
            <button type="button" onClick={event => openCart(event.currentTarget)} className="font-semibold underline">
              Revisá tu carrito
            </button>{' '}
            para continuar.
          </p>
        )}
        {checkout.customer && !checkout.cart.hasIssues && (
          <CheckoutReview checkout={checkout} onEdit={() => void query.refetch()} />
        )}
        <div hidden={Boolean(checkout.customer) && !checkout.cart.hasIssues}>
          <CheckoutForm
            checkout={checkout}
            user={user}
            pending={pending || query.isFetching}
            error={error}
            onPreview={input => preview.mutate(input)}
          />
        </div>
      </div>
      <CheckoutSummary checkout={checkout} />
    </div>
  )
}
