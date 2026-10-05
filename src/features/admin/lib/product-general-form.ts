import { z } from 'zod'
import { SLUG_PATTERN } from '@/src/lib/slug'
import type { AdminProduct, UpdateProductInput } from '@/src/types/api/admin-products'

export const productGeneralSchema = z.object({
  name: z.string().trim().min(2, 'Escribí al menos 2 letras.').max(200, 'Usá hasta 200 caracteres.'),
  slug: z
    .string()
    .trim()
    .min(1, 'El identificador no puede quedar vacío.')
    .max(220, 'Usá hasta 220 caracteres.')
    .regex(SLUG_PATTERN, 'Solo minúsculas, números y guiones.'),
  shortDescription: z.string().trim().max(500, 'Usá hasta 500 caracteres.'),
  description: z.string().trim().max(20000, 'Usá hasta 20.000 caracteres.'),
  warrantyMonths: z
    .string()
    .trim()
    .refine(
      value => value === '' || (/^\d+$/.test(value) && Number(value) <= 240),
      'Un número de meses entre 0 y 240.',
    ),
})

export type ProductGeneralValues = z.infer<typeof productGeneralSchema>

export function productGeneralValues(product: AdminProduct): ProductGeneralValues {
  return {
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription ?? '',
    description: product.description ?? '',
    warrantyMonths: product.warrantyMonths === null ? '' : String(product.warrantyMonths),
  }
}

export function toGeneralInput(values: ProductGeneralValues): UpdateProductInput {
  return {
    name: values.name,
    slug: values.slug,
    shortDescription: values.shortDescription || null,
    description: values.description || null,
    warrantyMonths: values.warrantyMonths === '' ? null : Number(values.warrantyMonths),
  }
}
