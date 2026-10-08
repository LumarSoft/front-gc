'use client'

import { useState } from 'react'
import { FormField } from '@/src/components/ui/form-field'
import { Textarea } from '@/src/components/ui/textarea'
import { FormDialog } from '@/src/features/admin/components/common/form-dialog'
import type { Order } from '@/src/types/api/orders'

type CancelOrderDialogProps = {
  order: Order
  open: boolean
  onOpenChange: (open: boolean) => void
  pending: boolean
  onCancel: (note: string) => void
}

const NOTE_MAX = 255

/** Cancelling releases the reserved stock; an optional reason stays in the history for the team. */
export function CancelOrderDialog({ order, open, onOpenChange, pending, onCancel }: CancelOrderDialogProps) {
  const [note, setNote] = useState('')
  const change = (next: boolean) => {
    onOpenChange(next)
    if (!next) setNote('')
  }

  return (
    <FormDialog
      open={open}
      onOpenChange={change}
      title={`¿Cancelar ${order.number}?`}
      description="Se libera el stock reservado. El pedido queda en el historial y no se puede reabrir."
      submitLabel="Cancelar pedido"
      destructive
      pending={pending}
      onSubmit={event => {
        event.preventDefault()
        onCancel(note)
      }}
    >
      <FormField
        id="cancel-note"
        label="Motivo (opcional)"
        description={`Solo lo ve el equipo. ${note.length}/${NOTE_MAX}`}
      >
        <Textarea
          id="cancel-note"
          value={note}
          maxLength={NOTE_MAX}
          onChange={event => setNote(event.target.value)}
          placeholder="Ej.: el cliente pidió cancelar por WhatsApp"
        />
      </FormField>
    </FormDialog>
  )
}
