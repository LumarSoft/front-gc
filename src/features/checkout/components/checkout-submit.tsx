'use client'

import Link from 'next/link'
import { useFormContext, useWatch } from 'react-hook-form'
import { Button } from '@/src/components/ui/button'
import { formatMoneyExact } from '@/src/lib/format'
import type { CheckoutTotals } from '../hooks/use-checkout-totals'
import type { CheckoutValues } from '../lib/checkout-schema'

const LEGAL = [
  { href: '/legales/terminos', label: 'Términos y condiciones' },
  { href: '/legales/privacidad', label: 'Privacidad' },
  { href: '/arrepentimiento', label: 'Botón de arrepentimiento' },
]

type CheckoutSubmitProps = { totals: CheckoutTotals; pending: boolean; disabled: boolean; error: string | null }

/** The total again on phones, the pay button and the store's legal pages. */
export function CheckoutSubmit({ totals, pending, disabled, error }: CheckoutSubmitProps) {
  const { control } = useFormContext<CheckoutValues>()
  const online = useWatch({ control, name: 'paymentMethod' }) === 'MERCADO_PAGO'
  return (
    <div className="space-y-4">
      {totals.total && (
        <p className="flex items-baseline justify-between text-sm lg:hidden">
          <span>Total · {totals.itemCount === 1 ? '1 artículo' : `${totals.itemCount} artículos`}</span>
          <span className="text-lg font-bold tabular-nums">{formatMoneyExact(totals.total)}</span>
        </p>
      )}
      {error && (
        <p role="alert" className="rounded-lg border border-destructive px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}
      <Button type="submit" disabled={pending || disabled} className="h-13 w-full rounded-lg text-base font-semibold">
        {pending ? 'Procesando…' : online ? 'Pagar ahora' : 'Confirmar pedido'}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Seguís tu pedido con un enlace privado, sin crear una cuenta.
      </p>
      <nav aria-label="Legales" className="flex flex-wrap gap-x-4 gap-y-1 border-t pt-4 text-xs">
        {LEGAL.map(link => (
          <Link key={link.href} href={link.href} className="text-primary underline underline-offset-4">
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
