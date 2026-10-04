import { apiRequest } from '@/src/lib/api-client'
import type { AdminBrand, AdminCategory, AdminTag } from '@/src/types/api/admin-catalog'

export function getAdminCategories(): Promise<AdminCategory[]> {
  return apiRequest<AdminCategory[]>('/admin/categories')
}

export function getAdminBrands(): Promise<AdminBrand[]> {
  return apiRequest<AdminBrand[]>('/admin/brands')
}

export function getAdminTags(): Promise<AdminTag[]> {
  return apiRequest<AdminTag[]>('/admin/tags')
}
