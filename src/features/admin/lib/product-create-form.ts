import { z } from 'zod'
import type { CreateProductInput } from '@/src/types/api/admin-products'

/** Same rule as the API: letters, numbers, dots, dashes and underscores (Tango-style article codes). */
const SKU_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/

export const productCreateSchema = z.object({
  name: z.string().trim().min(2, 'Escribí al menos 2 letras.').max(200, 'Usá hasta 200 caracteres.'),
  categoryId: z.number({ error: 'Elegí una categoría.' }).int().positive('Elegí una categoría.'),
  brandId: z.number().int().positive().nullable(),
  sku: z
    .string()
    .trim()
    .min(1, 'Escribí el SKU (código del artículo).')
    .max(60, 'Usá hasta 60 caracteres.')
    .regex(SKU_PATTERN, 'Solo letras, números, puntos, guiones y guiones bajos.'),
})

export type ProductCreateValues = z.infer<typeof productCreateSchema>

export const PRODUCT_CREATE_DEFAULTS: ProductCreateValues = {
  name: '',
  categoryId: 0,
  brandId: null,
  sku: '',
}

export function toCreateProductInput(values: ProductCreateValues): CreateProductInput {
  return { name: values.name, categoryId: values.categoryId, brandId: values.brandId, sku: values.sku }
}
