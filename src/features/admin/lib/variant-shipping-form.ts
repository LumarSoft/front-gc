import { z } from 'zod'
import { intText, intToText, toIntOrNull } from '@/src/features/admin/lib/form-fields'
import type { AdminVariant, VariantInput } from '@/src/types/api/admin-products'

const dimension = intText({ min: 0, max: 100_000, optional: true })

export const variantShippingSchema = z.object({
  weightGrams: intText({ min: 0, max: 10_000_000, optional: true }),
  lengthMm: dimension,
  widthMm: dimension,
  heightMm: dimension,
})

export type VariantShippingValues = z.infer<typeof variantShippingSchema>

export function variantShippingValues(variant: AdminVariant): VariantShippingValues {
  return {
    weightGrams: intToText(variant.weightGrams),
    lengthMm: intToText(variant.lengthMm),
    widthMm: intToText(variant.widthMm),
    heightMm: intToText(variant.heightMm),
  }
}

export function toShippingInput(values: VariantShippingValues): VariantInput {
  return {
    weightGrams: toIntOrNull(values.weightGrams),
    lengthMm: toIntOrNull(values.lengthMm),
    widthMm: toIntOrNull(values.widthMm),
    heightMm: toIntOrNull(values.heightMm),
  }
}
