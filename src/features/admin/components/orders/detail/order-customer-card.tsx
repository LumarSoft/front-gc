'use client'

import { CopyIcon, EnvelopeSimpleIcon, PhoneIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { ToneBadge } from '@/src/features/admin/components/common/tone-badge'
import type { Order } from '@/src/types/api/orders'

const LINK = 'flex min-w-0 items-center gap-2 text-sm hover:underline'

/** Who bought and how to reach them (email and phone open the mail and phone apps). */
export function OrderCustomerCard({ order }: { order: Order }) {
  const { name, email, phone } = order.customer
  const copyEmail = () =>
    navigator.clipboard.writeText(email).then(
      () => toast.success('Email copiado'),
      () => toast.error('No pudimos copiar el email.'),
    )

  return (
    <AdminCard
      title="Cliente"
      aside={
        order.guest && (
          <ToneBadge tone="neutral" dot={false}>
            Sin cuenta
          </ToneBadge>
        )
      }
    >
      <p className="text-sm font-medium">{name}</p>
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <a href={`mailto:${email}`} className={LINK}>
            <EnvelopeSimpleIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{email}</span>
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copiar email"
            className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <CopyIcon className="size-4" />
          </button>
        </div>
        {phone ? (
          <a href={`tel:${phone}`} className={LINK}>
            <PhoneIcon className="size-4 shrink-0 text-muted-foreground" />
            {phone}
          </a>
        ) : (
          <p className="text-sm text-muted-foreground">Sin teléfono</p>
        )}
      </div>
    </AdminCard>
  )
}
