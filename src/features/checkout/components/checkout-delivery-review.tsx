import { cn } from '@/src/lib/utils'
import { formatCuit } from '@/src/features/wholesale/lib/cuit'
import type { Checkout } from '@/src/types/api/checkout'
import { formatDeliveryDays, splitPickupPoint } from '../lib/shipping-quote-display'

/** How the purchase arrives: pickup, Rosario delivery or the chosen carrier option, with the address. */
export function CheckoutDeliveryReview({ checkout }: { checkout: Checkout }) {
  const delivery = checkout.deliveryOptions.find(option => option.code === checkout.deliveryMethod)
  const address = checkout.shippingAddress
  const quote = checkout.shippingQuote
  const branch = quote?.pickupPoint ? splitPickupPoint(quote.pickupPoint) : null
  const days = quote && formatDeliveryDays(quote.minDays, quote.maxDays)
  return (
    <div className="rounded-2xl border p-5">
      <h3 className="font-bold">{delivery?.name}</h3>
      {quote && (
        <p className="mt-3 text-sm">
          <span className="font-semibold">{branch ? 'Retiro en sucursal' : 'Envío a domicilio'}</span> · {quote.carrier}
          {days && ` · llega en ${days}`}
        </p>
      )}
      {branch && (
        <p className="mt-2 text-sm">
          Retirás en <span className="font-semibold">{branch.name}</span>
          {branch.address && <span className="block text-muted-foreground">{branch.address}</span>}
        </p>
      )}
      {address ? (
        <p className={cn('mt-3 text-sm', branch && 'text-muted-foreground')}>
          {branch && 'Tu domicilio: '}
          {address.street} {address.streetNumber}, {address.city}, {address.province} · CP {address.postalCode}
          {address.taxId && (
            <span className="block">
              {address.taxId.length === 11 ? 'CUIT' : 'DNI'} {formatCuit(address.taxId)}
            </span>
          )}
        </p>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">Retiro sin costo en nuestro local de Rosario.</p>
      )}
    </div>
  )
}
