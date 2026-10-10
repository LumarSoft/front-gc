import type { Cart } from '@/src/types/api/cart'
import type { CheckoutTotals } from '../../hooks/use-checkout-totals'
import { OrderLines } from './order-lines'
import { SummaryTotals } from './summary-totals'

/** Desktop summary column: products, then the totals. */
export function CheckoutSummary({ cart, totals }: { cart: Cart; totals: CheckoutTotals }) {
  return (
    <div className="space-y-6">
      <h2 className="sr-only">Resumen del pedido</h2>
      <OrderLines items={cart.items} />
      <SummaryTotals totals={totals} />
    </div>
  )
}
