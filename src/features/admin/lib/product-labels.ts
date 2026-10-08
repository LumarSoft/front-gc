import type { OutOfStockBehavior } from '@/src/types/api/catalog'
import type {
  AdminProductSort,
  AdminVariantSummary,
  ProductIssue,
  ProductStatus,
  SaleUnit,
} from '@/src/types/api/admin-products'

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  PUBLISHED: 'Publicado',
  DRAFT: 'Borrador',
  HIDDEN: 'Oculto',
}

/** Saved views of the product list. */
export const PRODUCT_STATUS_VIEWS: { value: ProductStatus | undefined; label: string }[] = [
  { value: undefined, label: 'Todos' },
  { value: 'PUBLISHED', label: 'Publicados' },
  { value: 'DRAFT', label: 'Borradores' },
  { value: 'HIDDEN', label: 'Ocultos' },
]

export const PRODUCT_SORT_OPTIONS: { value: AdminProductSort; label: string }[] = [
  { value: 'updated', label: 'Última edición' },
  { value: 'name', label: 'Nombre (A–Z)' },
  { value: 'newest', label: 'Más nuevos' },
]

export const PRODUCT_ISSUE_LABELS: Record<ProductIssue, string> = {
  NO_ACTIVE_VARIANT: 'Sin variantes activas',
  NO_RETAIL_PRICE: 'Sin precio minorista',
  NO_IMAGE: 'Sin imágenes',
}

/** Issues that stop publishing (same rule as the API). */
export const BLOCKING_ISSUES: ProductIssue[] = ['NO_ACTIVE_VARIANT', 'NO_RETAIL_PRICE']

export const OUT_OF_STOCK_OPTIONS: { value: OutOfStockBehavior; label: string; description: string }[] = [
  {
    value: 'SHOW_UNAVAILABLE',
    label: 'Mostrar como sin stock',
    description: 'Sigue visible en la tienda, pero no se puede comprar.',
  },
  {
    value: 'ALLOW_INQUIRY',
    label: 'Mostrar y permitir consultas',
    description: 'Sigue visible y el cliente puede consultar por disponibilidad.',
  },
  {
    value: 'HIDE',
    label: 'Ocultar de la tienda',
    description: 'Desaparece del catálogo hasta que vuelva a tener stock.',
  },
]

export const SALE_UNIT_LABELS: Record<SaleUnit, string> = {
  UNIT: 'Unidad',
  BOX: 'Caja',
  PACK: 'Pack',
  ROLL: 'Rollo',
  METER: 'Metro',
  SQUARE_METER: 'Metro cuadrado',
  LITER: 'Litro',
  KIT: 'Kit',
}

/** How a variant is called in lists: its name, else its options ("Cyan / 70 ml"), else "Principal" or its SKU. */
export function variantTitle(variant: AdminVariantSummary & { optionValues?: Record<string, string> | null }): string {
  if (variant.name) return variant.name
  const options = Object.values(variant.optionValues ?? {})
  if (options.length) return options.join(' / ')
  return variant.isDefault ? 'Variante principal' : variant.sku
}
