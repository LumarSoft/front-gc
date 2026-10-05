import { z } from 'zod'
import { intText, intToText, toIntOrNull } from '@/src/features/admin/lib/form-fields'
import type { AdminVariant, StockInput } from '@/src/types/api/admin-products'

export const variantStockSchema = z.object({
  onHand: intText({ min: 0, max: 1_000_000 }),
  lowStockThreshold: intText({ min: 0, max: 100_000, optional: true }),
  note: z.string().trim().max(255, 'Hasta 255 caracteres.'),
})

export type VariantStockValues = z.infer<typeof variantStockSchema>

export function variantStockValues(variant: AdminVariant): VariantStockValues {
  return {
    onHand: String(variant.stock?.onHand ?? 0),
    lowStockThreshold: intToText(variant.stock?.lowStockThreshold),
    note: '',
  }
}

export function toStockInput(values: VariantStockValues): StockInput {
  return {
    onHand: Number(values.onHand),
    lowStockThreshold: toIntOrNull(values.lowStockThreshold),
    note: values.note || null,
  }
}
