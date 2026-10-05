import { z } from 'zod'
import { formatMoneyInput, parseMoneyInput } from '@/src/lib/money-input'
import type { AdminVariant, Currency, VariantPriceInput } from '@/src/types/api/admin-products'
import type { PriceList } from '@/src/types/api/admin-pricing'

const cents = (amount: string): bigint => BigInt(amount.replace('.', ''))

const priceRow = z
  .object({
    priceListId: z.number(),
    enabled: z.boolean(),
    amount: z.string(),
    currency: z.enum(['ARS', 'USD']),
    compareAtAmount: z.string(),
  })
  .superRefine((row, context) => {
    if (!row.enabled) return
    const amount = parseMoneyInput(row.amount)
    if (!amount || cents(amount) <= BigInt(0)) {
      context.addIssue({
        code: 'custom',
        path: ['amount'],
        message: 'Escribí un precio mayor que cero (ej.: 419.999,90).',
      })
      return
    }
    if (row.compareAtAmount.trim() === '') return
    const compareAt = parseMoneyInput(row.compareAtAmount)
    if (!compareAt || cents(compareAt) <= cents(amount)) {
      context.addIssue({ code: 'custom', path: ['compareAtAmount'], message: 'Tiene que ser mayor que el precio.' })
    }
  })

export const variantPricesSchema = z.object({ rows: z.array(priceRow) })
export type VariantPricesValues = z.infer<typeof variantPricesSchema>

/** One row per price list (retail first), filled with the variant's current price when it has one. */
export function variantPricesValues(variant: AdminVariant, lists: PriceList[]): VariantPricesValues {
  return {
    rows: lists.map(list => {
      const price = variant.prices.find(item => item.priceListId === list.id)
      return {
        priceListId: list.id,
        enabled: Boolean(price),
        amount: price ? formatMoneyInput(price.amount) : '',
        currency: (price?.currency ?? 'ARS') as Currency,
        compareAtAmount: price?.compareAtAmount ? formatMoneyInput(price.compareAtAmount) : '',
      }
    }),
  }
}

export function toVariantPriceInputs(values: VariantPricesValues): VariantPriceInput[] {
  return values.rows
    .filter(row => row.enabled)
    .map(row => ({
      priceListId: row.priceListId,
      amount: parseMoneyInput(row.amount) ?? '0',
      currency: row.currency,
      compareAtAmount: row.compareAtAmount.trim() ? parseMoneyInput(row.compareAtAmount) : null,
    }))
}
