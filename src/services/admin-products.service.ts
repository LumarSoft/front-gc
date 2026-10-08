import { apiRequest } from '@/src/lib/api-client'
import type {
  AdminProduct,
  AdminProductsQuery,
  BulkProductAction,
  BulkProductsResult,
  CreateProductInput,
  PaginatedAdminProducts,
  ProductImageInput,
  ProductStatus,
  SpecificationInput,
  UpdateProductInput,
} from '@/src/types/api/admin-products'

function toQueryString(query: AdminProductsQuery): string {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== '') params.set(key, String(value))
  }
  const queryString = params.toString()
  return queryString ? `?${queryString}` : ''
}

export function getAdminProducts(query: AdminProductsQuery): Promise<PaginatedAdminProducts> {
  return apiRequest<PaginatedAdminProducts>(`/admin/products${toQueryString(query)}`)
}

export function bulkUpdateProducts(ids: number[], action: BulkProductAction): Promise<BulkProductsResult> {
  return apiRequest<BulkProductsResult>('/admin/products/bulk', { method: 'POST', body: { ids, action } })
}

export function getAdminProduct(id: number): Promise<AdminProduct> {
  return apiRequest<AdminProduct>(`/admin/products/${id}`)
}

export function createProduct(input: CreateProductInput): Promise<AdminProduct> {
  return apiRequest<AdminProduct>('/admin/products', { method: 'POST', body: input })
}

export function updateProduct(id: number, input: UpdateProductInput): Promise<AdminProduct> {
  return apiRequest<AdminProduct>(`/admin/products/${id}`, { method: 'PATCH', body: input })
}

export function setProductStatus(id: number, status: ProductStatus): Promise<AdminProduct> {
  return apiRequest<AdminProduct>(`/admin/products/${id}/status`, { method: 'PUT', body: { status } })
}

export function replaceProductImages(id: number, images: ProductImageInput[]): Promise<AdminProduct> {
  return apiRequest<AdminProduct>(`/admin/products/${id}/images`, { method: 'PUT', body: { images } })
}

export function replaceProductSpecifications(id: number, specifications: SpecificationInput[]): Promise<AdminProduct> {
  return apiRequest<AdminProduct>(`/admin/products/${id}/specifications`, { method: 'PUT', body: { specifications } })
}

export function replaceProductTags(id: number, tagIds: number[]): Promise<AdminProduct> {
  return apiRequest<AdminProduct>(`/admin/products/${id}/tags`, { method: 'PUT', body: { tagIds } })
}

export function duplicateProduct(id: number): Promise<AdminProduct> {
  return apiRequest<AdminProduct>(`/admin/products/${id}/duplicate`, { method: 'POST' })
}

export function archiveProduct(id: number): Promise<void> {
  return apiRequest<void>(`/admin/products/${id}`, { method: 'DELETE' })
}
