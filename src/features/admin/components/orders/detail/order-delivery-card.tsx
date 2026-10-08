import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { DELIVERY_LABELS } from '@/src/features/admin/lib/order-display'
import type { Order } from '@/src/types/api/orders'

/** How the order leaves the store, with the address for deliveries. */
export function OrderDeliveryCard({ order }: { order: Order }) {
  const address = order.shippingAddress
  const street = [address?.street, address?.streetNumber].filter(Boolean).join(' ')
  const city = [address?.city, address?.province, address?.postalCode].filter(Boolean).join(', ')

  return (
    <AdminCard title="Entrega">
      <p className="text-sm font-medium">{DELIVERY_LABELS[order.deliveryMethod]}</p>
      {address ? (
        <address className="mt-1 text-sm text-muted-foreground not-italic">
          {street && <span className="block">{street}</span>}
          {city && <span className="block">{city}</span>}
        </address>
      ) : (
        <p className="mt-1 text-sm text-muted-foreground">El cliente lo retira en el local.</p>
      )}
    </AdminCard>
  )
}
