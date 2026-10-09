'use client'

import { CopyIcon, ExternalLinkIcon } from 'lucide-react'
import { toast } from 'sonner'
import { splitPickupPoint } from '@/src/features/checkout/lib/shipping-quote-display'
import { safeTrackingUrl } from '@/src/features/orders/lib/shipment-labels'
import type { Shipment } from '@/src/types/api/orders'

/** Carrier, option, branch and tracking of a shipment, as a compact definition list. */
export function ShipmentDetails({ shipment }: { shipment: Shipment }) {
  const branch = shipment.pickupPoint ? splitPickupPoint(shipment.pickupPoint) : null
  const trackingUrl = safeTrackingUrl(shipment.trackingUrl)
  const copyTracking = (number: string) =>
    navigator.clipboard.writeText(number).then(
      () => toast.success('Número de seguimiento copiado'),
      () => toast.error('No pudimos copiar el número.'),
    )
  return (
    <dl className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-x-4 gap-y-2.5 text-sm">
      <dt className="text-muted-foreground">Transporte</dt>
      <dd>{[shipment.carrier, shipment.service].filter(Boolean).join(' · ') || '—'}</dd>
      <dt className="text-muted-foreground">Entrega</dt>
      <dd>
        {branch ? (
          <>
            Retira en <span className="font-medium">{branch.name}</span>
            {branch.address && <span className="block text-muted-foreground">{branch.address}</span>}
          </>
        ) : (
          'A domicilio'
        )}
      </dd>
      {shipment.carrierStatus && (
        <>
          <dt className="text-muted-foreground">Según Zipnova</dt>
          <dd>{shipment.carrierStatus}</dd>
        </>
      )}
      {shipment.trackingNumber && (
        <>
          <dt className="text-muted-foreground">Seguimiento</dt>
          <dd className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="flex items-center gap-1">
              <span className="tabular-nums">{shipment.trackingNumber}</span>
              <button
                type="button"
                onClick={() => void copyTracking(shipment.trackingNumber!)}
                aria-label="Copiar número de seguimiento"
                className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <CopyIcon className="size-4" />
              </button>
            </span>
            {trackingUrl && (
              <a
                href={trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                Ver en el transporte
                <ExternalLinkIcon className="size-3.5" />
              </a>
            )}
          </dd>
        </>
      )}
    </dl>
  )
}
