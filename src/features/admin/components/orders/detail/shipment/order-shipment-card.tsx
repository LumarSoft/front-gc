'use client'

import { InfoIcon, LoaderCircleIcon, RefreshCwIcon } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { ConfirmDialog } from '@/src/components/ui/confirm-dialog'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { ToneBadge } from '@/src/features/admin/components/common/tone-badge'
import { useShipmentActions } from '@/src/features/admin/hooks/use-shipment-actions'
import { shipmentBadge, shipmentHint } from '@/src/features/admin/lib/shipment-display'
import type { Order, Shipment } from '@/src/types/api/orders'
import { ShipmentDetails } from './shipment-details'
import { ShipmentDocumentsMenu } from './shipment-documents-menu'

/** The order's carrier shipment at Zipnova: book it, print its documents, cancel it before dispatch or refresh it. */
export function OrderShipmentCard({ order, shipment }: { order: Order; shipment: Shipment }) {
  const actions = useShipmentActions(order)
  const badge = shipmentBadge(shipment)
  const hint = shipmentHint(order, shipment, actions.can('CREATE'))
  const spinner = <LoaderCircleIcon className="animate-spin" />
  const hasFooter = Boolean(shipment.actions?.length)

  return (
    <AdminCard
      title="Envío por transporte"
      aside={<ToneBadge tone={badge.tone}>{badge.label}</ToneBadge>}
      footer={
        hasFooter && (
          <>
            {actions.can('REFRESH') && (
              <Button variant="ghost" disabled={actions.pending} onClick={() => actions.run('refresh')}>
                {actions.running === 'refresh' ? spinner : <RefreshCwIcon />}
                Actualizar
              </Button>
            )}
            {actions.can('CANCEL') && (
              <Button variant="outline" disabled={actions.pending} onClick={() => actions.setConfirmCancel(true)}>
                {actions.running === 'cancel' && spinner}
                Cancelar envío
              </Button>
            )}
            {actions.can('DOCUMENTS') && (
              <ShipmentDocumentsMenu
                pending={actions.pending}
                downloading={actions.running === 'download'}
                onDownload={actions.download}
              />
            )}
            {actions.can('CREATE') && (
              <Button disabled={actions.pending} onClick={() => actions.run('create')}>
                {actions.running === 'create' && spinner}
                Generar envío
              </Button>
            )}
          </>
        )
      }
    >
      <ShipmentDetails shipment={shipment} />
      {hint && (
        <p className="mt-4 flex items-start gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
          <InfoIcon className="mt-0.5 size-4 shrink-0" />
          {hint}
        </p>
      )}
      <ConfirmDialog
        open={actions.confirmCancel}
        onOpenChange={actions.setConfirmCancel}
        title={`¿Cancelar el envío de ${order.number}?`}
        description="Se anula en Zipnova antes del despacho y las etiquetas dejan de valer. El pedido no cambia de estado y podés generar el envío de nuevo."
        confirmLabel="Cancelar envío"
        cancelLabel="Volver"
        destructive
        onConfirm={() => actions.run('cancel')}
      />
    </AdminCard>
  )
}
