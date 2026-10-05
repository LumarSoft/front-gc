import { apiRequest } from '@/src/lib/api-client'
import type { AdminProduct, StockInput, VariantInput, VariantPriceInput } from '@/src/types/api/admin-products'

const base = (productId: number): string => `/admin/products/${productId}/variants`

export function createVariant(productId: number, input: VariantInput & { sku: string }): Promise<AdminProduct> {
  return apiRequest<AdminProduct>(base(productId), { method: 'POST', body: input })
}

export function updateVariant(productId: number, variantId: number, input: VariantInput): Promise<AdminProduct> {
  return apiRequest<AdminProduct>(`${base(productId)}/${variantId}`, { method: 'PATCH', body: input })
}

export function setDefaultVariant(productId: number, variantId: number): Promise<AdminProduct> {
  return apiRequest<AdminProduct>(`${base(productId)}/${variantId}/default`, { method: 'PUT' })
}

export function archiveVariant(productId: number, variantId: number): Promise<AdminProduct> {
  return apiRequest<AdminProduct>(`${base(productId)}/${variantId}`, { method: 'DELETE' })
}

export function replaceVariantPrices(
  productId: number,
  variantId: number,
  prices: VariantPriceInput[],
): Promise<AdminProduct> {
  return apiRequest<AdminProduct>(`${base(productId)}/${variantId}/prices`, { method: 'PUT', body: { prices } })
}

/** Provisional manual stock count (until stock comes from Tango). */
export function adjustVariantStock(productId: number, variantId: number, input: StockInput): Promise<AdminProduct> {
  return apiRequest<AdminProduct>(`${base(productId)}/${variantId}/stock`, { method: 'PUT', body: input })
}
