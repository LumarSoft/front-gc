'use client'

import { useState } from 'react'
import { FormField } from '@/src/components/ui/form-field'
import { Textarea } from '@/src/components/ui/textarea'
import type { WholesaleDecision } from '@/src/types/api/wholesale'
import { FormDialog } from '../common/form-dialog'
import { DECISIONS_WITH_REASON } from '../../hooks/use-admin-wholesale'

const COPY: Record<WholesaleDecision, { title: string; description: string; submit: string }> = {
  approve: {
    title: 'Aprobar cuenta',
    description: 'Desde su próximo ingreso, la empresa compra con los precios de cliente frecuente.',
    submit: 'Aprobar',
  },
  reject: {
    title: 'Rechazar solicitud',
    description: 'El cliente ve el motivo y puede corregir sus datos para enviar una nueva solicitud.',
    submit: 'Rechazar',
  },
  pause: {
    title: 'Pausar cuenta',
    description: 'La empresa vuelve a comprar con los precios de la tienda hasta que la reactives.',
    submit: 'Pausar',
  },
  resume: {
    title: 'Reactivar cuenta',
    description: 'La empresa vuelve a comprar con los precios de cliente frecuente.',
    submit: 'Reactivar',
  },
}

type Props = {
  decision: WholesaleDecision | null
  companyName: string
  pending: boolean
  onClose: () => void
  onConfirm: (note?: string) => void
}

export function WholesaleDecisionDialog({ decision, companyName, pending, onClose, onConfirm }: Props) {
  const [note, setNote] = useState('')
  const [error, setError] = useState<string | null>(null)
  const needsReason = decision !== null && DECISIONS_WITH_REASON.includes(decision)
  const copy = decision ? COPY[decision] : COPY.approve
  const close = (): void => {
    setNote('')
    setError(null)
    onClose()
  }
  return (
    <FormDialog
      open={decision !== null}
      onOpenChange={open => !open && close()}
      title={`${copy.title}: ${companyName}`}
      description={copy.description}
      submitLabel={copy.submit}
      pending={pending}
      onSubmit={event => {
        event.preventDefault()
        if (needsReason && !note.trim()) return setError('Contale al cliente el motivo.')
        onConfirm(note.trim() || undefined)
      }}
    >
      <FormField
        id="wholesale-decision-note"
        label={needsReason ? 'Motivo (lo ve el cliente)' : 'Nota para el cliente (opcional)'}
        error={error ? { message: error } : undefined}
      >
        <Textarea
          id="wholesale-decision-note"
          rows={4}
          maxLength={500}
          value={note}
          aria-invalid={Boolean(error)}
          onChange={event => {
            setNote(event.target.value)
            setError(null)
          }}
        />
      </FormField>
    </FormDialog>
  )
}
