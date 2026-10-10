import { formatMoneyExact } from '@/src/lib/format'
import type { CheckoutTotals } from '../../hooks/use-checkout-totals'
import { deliveryPrice } from '../../lib/delivery-price'

/** Subtotal, delivery and total; the delivery says what is missing while its cost is not known. */
export function SummaryTotals({ totals }: { totals: CheckoutTotals }) {
  return (
    <dl className="space-y-2.5 text-sm">
      <div className="flex justify-between gap-4">
        <dt>Subtotal · {totals.itemCount === 1 ? '1 artículo' : `${totals.itemCount} artículos`}</dt>
        <dd className="tabular-nums">{totals.subtotal ? formatMoneyExact(totals.subtotal) : 'A confirmar'}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt>Envío</dt>
        <dd className={totals.shipping ? 'tabular-nums' : 'text-muted-foreground'}>
          {deliveryPrice(totals.shipping) ?? totals.shippingHint}
        </dd>
      </div>
      <div className="flex items-baseline justify-between gap-4 pt-2">
        <dt className="text-lg font-bold">Total</dt>
        <dd aria-live="polite" className="text-right">
          {totals.total && <span className="mr-2 text-xs text-muted-foreground">{totals.total.currency}</span>}
          <span className="text-xl font-bold tabular-nums">
            {totals.total ? formatMoneyExact(totals.total) : 'A confirmar'}
          </span>
        </dd>
      </div>
    </dl>
  )
}
