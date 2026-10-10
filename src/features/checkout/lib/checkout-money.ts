import type { Money } from '@/src/types/api/money'

/**
 * Decimal strings from the API ("1234.50") as integer cents. Order amounts stay far below 2^53 cents, so integer
 * arithmetic on them is exact (no float rounding).
 */
function toCents(amount: string): number {
  const [whole, fraction = ''] = amount.split('.')
  return Number(whole) * 100 + Number(fraction.padEnd(2, '0').slice(0, 2))
}

function fromCents(cents: number): string {
  return `${Math.trunc(cents / 100)}.${String(cents % 100).padStart(2, '0')}`
}

/**
 * Subtotal plus delivery as the summary shows it, from amounts the API priced. The API computes the total again when
 * the buyer pays, and the order is placed only if both match.
 */
export function addMoney(subtotal: Money, shipping: Money): Money {
  return { amount: fromCents(toCents(subtotal.amount) + toCents(shipping.amount)), currency: subtotal.currency }
}
