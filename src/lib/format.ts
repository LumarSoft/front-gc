import type { Money } from '@/src/types/api/money'

const formatters = new Map<string, Intl.NumberFormat>()

function getFormatter(currency: string): Intl.NumberFormat {
  let formatter = formatters.get(currency)
  if (!formatter) {
    formatter = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    })
    formatters.set(currency, formatter)
  }
  return formatter
}

/** Display-only formatting. The decimal string is converted to a number only to print it. */
export function formatMoney(money: Money): string {
  return getFormatter(money.currency).format(Number(money.amount))
}

/** Display-only: rounded percentage between the previous and the current price. */
export function getDiscountPercent(price: Money, compareAtPrice: Money): number {
  const current = Number(price.amount)
  const previous = Number(compareAtPrice.amount)
  if (previous <= 0 || current >= previous) return 0
  return Math.round((1 - current / previous) * 100)
}
