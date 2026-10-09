'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { shipmentBadge, shipmentErrorMessage } from '@/src/features/admin/lib/shipment-display'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { saveFile } from '@/src/lib/save-file'
import {
  cancelShipment,
  createShipment,
  downloadShipmentDocument,
  refreshShipment,
  type ShipmentDocument,
} from '@/src/services/admin-shipments.service'
import type { Order, ShipmentAction } from '@/src/types/api/orders'
import { useAdminMutation } from './use-admin-mutation'

type ShipmentCommand = 'create' | 'cancel' | 'refresh'

const COMMANDS: Record<ShipmentCommand, (orderId: number) => Promise<Order>> = {
  create: createShipment,
  cancel: cancelShipment,
  refresh: refreshShipment,
}

const SUCCESS: Record<ShipmentCommand, (order: Order) => string> = {
  create: order => `${order.number}: envío generado en Zipnova`,
  cancel: order => `${order.number}: envío cancelado`,
  refresh: order => `Envío actualizado: ${order.shipment ? shipmentBadge(order.shipment).label.toLowerCase() : ''}`,
}

function documentFileName(order: Order, document: ShipmentDocument): string {
  return `${order.number}-${document.kind === 'label' ? 'etiqueta' : 'guia'}.${document.format}`
}

/** Book, cancel and refresh an order's carrier shipment at Zipnova, and download its labels and guide. */
export function useShipmentActions(order: Order) {
  const queryClient = useQueryClient()
  const [confirmCancel, setConfirmCancel] = useState(false)
  const command = useAdminMutation({
    mutationFn: (name: ShipmentCommand) => COMMANDS[name](order.id),
    invalidate: [QUERY_KEYS.admin.orders],
    successMessage: (updated, name) => SUCCESS[name](updated),
    errorMessage: shipmentErrorMessage,
    onSuccess: updated => queryClient.setQueryData(QUERY_KEYS.admin.order(order.id), updated),
  })
  const download = useMutation({
    mutationFn: (document: ShipmentDocument) => downloadShipmentDocument(order.id, document),
    onSuccess: (file, document) => saveFile(file, documentFileName(order, document)),
    onError: error => toast.error(shipmentErrorMessage(error)),
  })
  const actions = order.shipment?.actions ?? []
  const pending = command.isPending || download.isPending

  return {
    can: (action: ShipmentAction): boolean => actions.includes(action),
    /** Which command is running, to show its spinner. */
    running: command.isPending ? command.variables : download.isPending ? ('download' as const) : null,
    pending,
    run: (name: ShipmentCommand): void => command.mutate(name, { onSuccess: () => setConfirmCancel(false) }),
    download: (document: ShipmentDocument): void => download.mutate(document),
    confirmCancel,
    setConfirmCancel,
  }
}
