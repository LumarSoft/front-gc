'use client'

import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { CartSkeleton } from '@/src/features/cart/components/cart-skeleton'
import { useCheckout } from '../hooks/use-checkout'
import { useRecoverOrder } from '../hooks/use-recover-order'
import { CheckoutScreen } from './checkout-screen'

const Centered = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-xl px-4 py-12 text-center sm:px-6">{children}</div>
)

export function CheckoutView() {
  const { query, preview, cartBusy, user } = useCheckout()
  const recovery = useRecoverOrder(Boolean(query.data && !query.data.cart.items.length))
  if (query.isPending || recovery.pending)
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <CartSkeleton />
      </div>
    )
  if (query.isError)
    return (
      <Centered>
        <p role="alert">No pudimos preparar tu compra. Revisá tu conexión y probá de nuevo.</p>
        <Button className="mt-5" onClick={() => void query.refetch()}>
          Reintentar
        </Button>
      </Centered>
    )
  if (!query.data.cart.items.length)
    return (
      <Centered>
        <h1 className="text-xl font-bold">Tu carrito está vacío</h1>
        <p className="mt-2 text-muted-foreground">Agregá productos para preparar tu compra.</p>
        {recovery.available && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Si acabás de confirmar y no recibiste la respuesta, podés recuperar el pedido.
            </p>
            <Button variant="outline" className="mt-3" onClick={recovery.recover}>
              Recuperar mi confirmación
            </Button>
          </div>
        )}
        <Button asChild className="mt-5">
          <Link href="/productos">Explorar productos</Link>
        </Button>
      </Centered>
    )
  return <CheckoutScreen checkout={query.data} user={user} preview={preview} cartBusy={cartBusy} />
}
