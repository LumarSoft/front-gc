'use client'

import { Button } from '@/src/components/ui/button'
import type { Checkout } from '@/src/types/api/checkout'
import { useCheckoutReviewFocus } from '../hooks/use-checkout-review-focus'

export function CheckoutReview({ checkout, onEdit }: { checkout: Checkout; onEdit: () => void }) {
  const heading = useCheckoutReviewFocus()
  const customer = checkout.customer!
  const delivery = checkout.deliveryOptions.find(option => option.code === checkout.deliveryMethod)
  return (
    <section className="space-y-6" aria-label="Revisión de la compra">
      <div>
        <p className="text-sm font-semibold text-success">Datos revisados</p>
        <h2 ref={heading} tabIndex={-1} className="mt-2 scroll-mt-44 text-2xl font-extrabold outline-none">
          Revisá que esté todo bien
        </h2>
      </div>
      <div className="rounded-2xl border p-5">
        <h3 className="font-bold">Datos de contacto</h3>
        <p className="mt-3">{customer.name}</p>
        <p className="break-all text-sm text-muted-foreground">{customer.email}</p>
        {customer.phone && <p className="text-sm text-muted-foreground">{customer.phone}</p>}
      </div>
      <div className="rounded-2xl border p-5">
        <h3 className="font-bold">{delivery?.name}</h3>
        {checkout.shippingAddress ? (
          <p className="mt-3 text-sm">
            {checkout.shippingAddress.street} {checkout.shippingAddress.streetNumber}, {checkout.shippingAddress.city},{' '}
            {checkout.shippingAddress.province} · CP {checkout.shippingAddress.postalCode}
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">Retiro sin costo en nuestro local de Rosario.</p>
        )}
      </div>
      <div className="rounded-2xl bg-surface p-5">
        <h3 className="font-bold">El pago estará disponible próximamente</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Todavía no se generó un pedido. Tu carrito sigue guardado para que puedas continuar cuando habilitemos los
          medios de pago.
        </p>
      </div>
      <Button variant="outline" className="h-11 rounded-full" onClick={onEdit}>
        Editar mis datos
      </Button>
    </section>
  )
}
