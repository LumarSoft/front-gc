'use client'

import { useState } from 'react'
import type { useAdminOrder } from '@/src/features/admin/hooks/use-admin-order'
import type { Order, OrderStatus } from '@/src/types/api/orders'

type OrderMutation = ReturnType<typeof useAdminOrder>['mutation']

/**
 * What staff can do next with an order. Marking it paid and cancelling ask first (dialogs); the other steps run at
 * once, since the API rejects anything out of order.
 */
export function useOrderActions(order: Order | undefined, mutation: OrderMutation) {
  const [dialog, setDialog] = useState<'payment' | 'cancel' | null>(null)
  const allowed = order?.allowedStatuses ?? []
  const close = () => setDialog(null)

  return {
    /** The next step forward, if any (cancelling is not one). */
    nextStep: allowed.find(status => status !== 'CANCELLED'),
    canCancel: allowed.includes('CANCELLED'),
    pending: mutation.isPending,
    dialog,
    setDialog,
    runStep: (status: OrderStatus): void => {
      if (status === 'CONFIRMED') setDialog('payment')
      else mutation.mutate({ status })
    },
    confirmPayment: (): void => mutation.mutate({ status: 'CONFIRMED', paymentReceived: true }, { onSuccess: close }),
    cancel: (note: string): void =>
      mutation.mutate({ status: 'CANCELLED', ...(note.trim() ? { note: note.trim() } : {}) }, { onSuccess: close }),
  }
}
