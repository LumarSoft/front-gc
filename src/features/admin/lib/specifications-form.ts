import { z } from 'zod'
import type { AdminProduct, SpecificationInput } from '@/src/types/api/admin-products'

export const specificationsSchema = z.object({
  rows: z
    .array(
      z.object({
        id: z.number().nullable(),
        groupName: z.string().trim().max(100, 'Hasta 100 caracteres.'),
        name: z.string().trim().min(1, 'Falta el nombre.').max(100, 'Hasta 100 caracteres.'),
        value: z.string().trim().min(1, 'Falta el valor.').max(500, 'Hasta 500 caracteres.'),
      }),
    )
    .max(200, 'Hasta 200 filas.'),
})

export type SpecificationsValues = z.infer<typeof specificationsSchema>
export type SpecificationRow = SpecificationsValues['rows'][number]

export const EMPTY_SPECIFICATION: SpecificationRow = { id: null, groupName: '', name: '', value: '' }

export function specificationsValues(product: AdminProduct): SpecificationsValues {
  return {
    rows: product.specifications.map(spec => ({
      id: spec.id,
      groupName: spec.groupName ?? '',
      name: spec.name,
      value: spec.value,
    })),
  }
}

export function toSpecificationInputs(values: SpecificationsValues): SpecificationInput[] {
  return values.rows.map(row => ({
    ...(row.id ? { id: row.id } : {}),
    groupName: row.groupName || null,
    name: row.name,
    value: row.value,
  }))
}
