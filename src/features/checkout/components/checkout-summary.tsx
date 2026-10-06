import Image from 'next/image'
import { formatMoneyExact } from '@/src/lib/format'
import type { Checkout } from '@/src/types/api/checkout'

export function CheckoutSummary({ checkout }: { checkout: Checkout }) {
  return (
    <aside className="h-fit rounded-3xl bg-surface p-5 sm:p-6 lg:sticky lg:top-44" aria-label="Resumen de compra">
      <h2 className="text-xl font-extrabold">Tu compra</h2>
      <ul className="mt-6 divide-y">
        {checkout.cart.items.map(item => (
          <li key={item.variantId} className="flex gap-3 py-4 first:pt-0">
            {item.imageUrl && (
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-background">
                <Image src={item.imageUrl} alt={item.name} fill sizes="64px" className="object-contain p-1" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{item.name}</p>
              {item.variantName && <p className="text-xs text-muted-foreground">{item.variantName}</p>}
              <p className="mt-1 text-xs text-muted-foreground">Cantidad: {item.quantity}</p>
              <p className="mt-2 font-bold">{item.total ? formatMoneyExact(item.total) : 'A confirmar'}</p>
            </div>
          </li>
        ))}
      </ul>
      <dl className="mt-5 space-y-3 border-t pt-5">
        <div className="flex justify-between gap-3 text-sm">
          <dt>Subtotal</dt>
          <dd>{checkout.cart.subtotal ? formatMoneyExact(checkout.cart.subtotal) : 'A confirmar'}</dd>
        </div>
        <div className="flex justify-between gap-3 text-sm">
          <dt>Entrega</dt>
          <dd>
            {checkout.customer && checkout.shippingTotal ? formatMoneyExact(checkout.shippingTotal) : 'A confirmar'}
          </dd>
        </div>
        <div className="flex justify-between gap-3 border-t pt-4 text-xl font-extrabold">
          <dt>Total</dt>
          <dd aria-live="polite">
            {checkout.customer && checkout.total ? formatMoneyExact(checkout.total) : 'A confirmar'}
          </dd>
        </div>
      </dl>
      <p className="mt-4 text-xs text-muted-foreground">
        Los precios y la disponibilidad se verifican al revisar tu compra.
      </p>
    </aside>
  )
}
