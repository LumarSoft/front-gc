import { apiRequest } from '@/src/lib/api-client'
import type {
  AdminBrand,
  AdminCategory,
  AdminTag,
  BrandInput,
  CategoryInput,
  TagInput,
} from '@/src/types/api/admin-catalog'

export function getAdminCategories(): Promise<AdminCategory[]> {
  return apiRequest<AdminCategory[]>('/admin/categories')
}

export function createCategory(input: CategoryInput): Promise<AdminCategory> {
  return apiRequest<AdminCategory>('/admin/categories', { method: 'POST', body: input })
}

export function updateCategory(id: number, input: Partial<CategoryInput>): Promise<AdminCategory> {
  return apiRequest<AdminCategory>(`/admin/categories/${id}`, { method: 'PATCH', body: input })
}

/** `ids`: every category of one level, in the new order. */
export function reorderCategories(ids: number[]): Promise<AdminCategory[]> {
  return apiRequest<AdminCategory[]>('/admin/categories/order', { method: 'PUT', body: { ids } })
}

export function archiveCategory(id: number): Promise<void> {
  return apiRequest<void>(`/admin/categories/${id}`, { method: 'DELETE' })
}

export function getAdminBrands(): Promise<AdminBrand[]> {
  return apiRequest<AdminBrand[]>('/admin/brands')
}

export function createBrand(input: BrandInput): Promise<AdminBrand> {
  return apiRequest<AdminBrand>('/admin/brands', { method: 'POST', body: input })
}

export function updateBrand(id: number, input: Partial<BrandInput>): Promise<AdminBrand> {
  return apiRequest<AdminBrand>(`/admin/brands/${id}`, { method: 'PATCH', body: input })
}

/** `ids`: every brand, in the new order. */
export function reorderBrands(ids: number[]): Promise<AdminBrand[]> {
  return apiRequest<AdminBrand[]>('/admin/brands/order', { method: 'PUT', body: { ids } })
}

export function archiveBrand(id: number): Promise<void> {
  return apiRequest<void>(`/admin/brands/${id}`, { method: 'DELETE' })
}

export function getAdminTags(): Promise<AdminTag[]> {
  return apiRequest<AdminTag[]>('/admin/tags')
}

export function createTag(input: TagInput): Promise<AdminTag> {
  return apiRequest<AdminTag>('/admin/tags', { method: 'POST', body: input })
}

export function updateTag(id: number, input: Partial<TagInput>): Promise<AdminTag> {
  return apiRequest<AdminTag>(`/admin/tags/${id}`, { method: 'PATCH', body: input })
}

export function archiveTag(id: number): Promise<void> {
  return apiRequest<void>(`/admin/tags/${id}`, { method: 'DELETE' })
}
