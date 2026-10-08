'use client'

import { useState } from 'react'
import { CheckboxField } from '@/src/components/ui/checkbox-field'
import { FormDialog } from '@/src/features/admin/components/common/form-dialog'
import { formatMoneyExact } from '@/src/lib/format'
import type { Order } from '@/src/types/api/orders'

type ConfirmPaymentDialogProps = {
  order: Order
  open: boolean
  onOpenChange: (open: boolean) => void
  pending: boolean
  onConfirm: () => void
}

/** Marking an order paid moves stock for real: staff confirm they received the full amount first. */
export function ConfirmPaymentDialog({ order, open, onOpenChange, pending, onConfirm }: ConfirmPaymentDialogProps) {
  const [received, setReceived] = useState(false)
  const change = (next: boolean) => {
    onOpenChange(next)
    if (!next) setReceived(false)
  }

  return (
    <FormDialog
      open={open}
      onOpenChange={change}
      title={`Marcar ${order.number} como pagado`}
      description="El stock reservado se descuenta y el pedido pasa a preparación. No se puede deshacer."
      submitLabel="Marcar como pagado"
      submitDisabled={!received}
      pending={pending}
      onSubmit={event => {
        event.preventDefault()
        if (received) onConfirm()
      }}
    >
      <CheckboxField
        id="payment-received"
        checked={received}
        onCheckedChange={setReceived}
        label={`Verifiqué que recibí el pago completo de ${formatMoneyExact(order.total)}.`}
      />
    </FormDialog>
  )
}
