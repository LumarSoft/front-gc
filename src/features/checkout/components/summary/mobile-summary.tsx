'use client'

import { useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { formatMoneyExact } from '@/src/lib/format'
import { cn } from '@/src/lib/utils'
import type { Cart } from '@/src/types/api/cart'
import type { CheckoutTotals } from '../../hooks/use-checkout-totals'
import { CheckoutSummary } from './checkout-summary'

/** Phones: the summary folds into a bar with the total, opened on demand. */
export function MobileSummary({ cart, totals }: { cart: Cart; totals: CheckoutTotals }) {
  const [open, setOpen] = useState(false)
  const shown = totals.total ?? totals.subtotal
  return (
    <div className="border-b bg-surface lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="checkout-mobile-summary"
        onClick={() => setOpen(value => !value)}
        className="mx-auto flex w-full max-w-xl items-center justify-between gap-4 px-4 py-4 text-left sm:px-6"
      >
        <span className="flex items-center gap-1.5 text-sm text-primary">
          {open ? 'Ocultar resumen del pedido' : 'Resumen del pedido'}
          <ChevronDownIcon aria-hidden className={cn('size-4 transition-transform', open && 'rotate-180')} />
        </span>
        {shown && <span className="text-lg font-bold tabular-nums">{formatMoneyExact(shown)}</span>}
      </button>
      {open && (
        <div id="checkout-mobile-summary" className="mx-auto max-w-xl px-4 pb-6 sm:px-6">
          <CheckoutSummary cart={cart} totals={totals} />
        </div>
      )}
    </div>
  )
}
