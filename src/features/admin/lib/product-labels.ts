import type { OutOfStockBehavior } from '@/src/types/api/catalog'
import type { ProductIssue, ProductStatus } from '@/src/types/api/admin-products'

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  PUBLISHED: 'Publicado',
  DRAFT: 'Borrador',
  HIDDEN: 'Oculto',
}

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
