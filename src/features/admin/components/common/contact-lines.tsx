'use client'

import { CopyIcon, MailIcon, PhoneIcon } from 'lucide-react'
import { toast } from 'sonner'

const LINK = 'flex min-w-0 items-center gap-2 text-sm hover:underline'

/** Email that opens the mail app, with a button to copy it. */
export function EmailLine({ email }: { email: string }) {
  const copy = () =>
    navigator.clipboard.writeText(email).then(
      () => toast.success('Email copiado'),
      () => toast.error('No pudimos copiar el email.'),
    )
  return (
    <div className="flex items-center gap-1">
      <a href={`mailto:${email}`} className={LINK}>
        <MailIcon className="size-4 shrink-0 text-muted-foreground" />
        <span className="truncate">{email}</span>
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copiar email"
        className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <CopyIcon className="size-4" />
      </button>
    </div>
  )
}

/** Phone that opens the dialer, or a muted "Sin teléfono". */
export function PhoneLine({ phone }: { phone: string | null }) {
  if (!phone) return <p className="text-sm text-muted-foreground">Sin teléfono</p>
  return (
    <a href={`tel:${phone}`} className={LINK}>
      <PhoneIcon className="size-4 shrink-0 text-muted-foreground" />
      {phone}
    </a>
  )
}
