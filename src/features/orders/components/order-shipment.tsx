import { ExternalLinkIcon } from 'lucide-react'
import { splitPickupPoint } from '@/src/features/checkout/lib/shipping-quote-display'
import type { Shipment } from '@/src/types/api/orders'
import { SHIPMENT_LABELS, safeTrackingUrl } from '../lib/shipment-labels'

/** Carrier, parcel state, tracking and pickup branch of an order shipped to the rest of the country. */
export function OrderShipment({ shipment }: { shipment: Shipment }) {
  const trackingUrl = safeTrackingUrl(shipment.trackingUrl)
  const branch = shipment.pickupPoint ? splitPickupPoint(shipment.pickupPoint) : null
  const carrier = [shipment.carrier, shipment.service].filter(Boolean).join(' · ')
  const label = SHIPMENT_LABELS[shipment.status]
  const carrierStatus =
    shipment.carrierStatus && shipment.carrierStatus.toLowerCase() !== label.toLowerCase()
      ? shipment.carrierStatus
      : null
  return (
    <div className="mt-4 rounded-xl border p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-semibold">{label}</p>
        {carrier && <p className="text-sm text-muted-foreground">{carrier}</p>}
      </div>
      {carrierStatus && <p className="mt-1 text-sm text-muted-foreground">Según el transporte: {carrierStatus}</p>}
      {branch && (
        <p className="mt-3 text-sm">
          Retirás en <span className="font-semibold">{branch.name}</span>
          {branch.address && <span className="block text-muted-foreground">{branch.address}</span>}
        </p>
      )}
      {shipment.trackingNumber && (
        <p className="mt-3 text-sm">
          Número de seguimiento: <span className="font-semibold tabular-nums">{shipment.trackingNumber}</span>
        </p>
      )}
      {trackingUrl && (
        <a
          href={trackingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Seguir el envío
          <ExternalLinkIcon className="size-4" aria-hidden />
        </a>
      )}
    </div>
  )
}
