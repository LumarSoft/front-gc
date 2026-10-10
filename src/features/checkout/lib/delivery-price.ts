import { formatMoneyExact } from '@/src/lib/format'
import type { Money } from '@/src/types/api/money'

/** A delivery cost as checkouts show it: "Gratis" when it costs nothing. */
export function deliveryPrice(cost: Money | null): string | null {
  if (!cost) return null
  return Number(cost.amount) === 0 ? 'Gratis' : formatMoneyExact(cost)
}
