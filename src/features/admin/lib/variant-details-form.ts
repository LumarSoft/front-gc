import { z } from 'zod'
import { intText } from '@/src/features/admin/lib/form-fields'
import type { AdminVariant, SaleUnit, VariantInput } from '@/src/types/api/admin-products'

const SKU_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/
const SALE_UNITS = ['UNIT', 'BOX', 'PACK', 'ROLL', 'METER', 'SQUARE_METER', 'LITER', 'KIT'] as const

export const variantDetailsSchema = z.object({
  sku: z
    .string()
    .trim()
    .min(1, 'Escribí el SKU.')
    .max(60, 'Hasta 60 caracteres.')
    .regex(SKU_PATTERN, 'Solo letras, números, puntos y guiones.'),
  name: z.string().trim().max(150, 'Hasta 150 caracteres.'),
  options: z
    .array(
      z.object({
        name: z.string().trim().min(1, 'Falta el nombre.').max(50, 'Hasta 50 caracteres.'),
        value: z.string().trim().min(1, 'Falta el valor.').max(100, 'Hasta 100 caracteres.'),
      }),
    )
    .max(5, 'Hasta 5 opciones.'),
  barcode: z.string().trim().max(50, 'Hasta 50 caracteres.'),
  isActive: z.boolean(),
  saleUnit: z.enum(SALE_UNITS),
  unitsPerSaleUnit: intText({ min: 1, max: 10000 }),
})

export type VariantDetailsValues = z.infer<typeof variantDetailsSchema>

export function variantDetailsValues(variant: AdminVariant): VariantDetailsValues {
  return {
    sku: variant.sku,
    name: variant.name ?? '',
    options: Object.entries(variant.optionValues ?? {}).map(([name, value]) => ({ name, value })),
    barcode: variant.barcode ?? '',
    isActive: variant.isActive,
    saleUnit: variant.saleUnit,
    unitsPerSaleUnit: String(variant.unitsPerSaleUnit),
  }
}

export function toVariantDetailsInput(values: VariantDetailsValues): VariantInput {
  return {
    sku: values.sku,
    name: values.name || null,
    optionValues: values.options.length
      ? Object.fromEntries(values.options.map(option => [option.name, option.value]))
      : null,
    barcode: values.barcode || null,
    isActive: values.isActive,
    saleUnit: values.saleUnit as SaleUnit,
    unitsPerSaleUnit: Number(values.unitsPerSaleUnit),
  }
}
