'use client'

import { useQuery } from '@tanstack/react-query'
import { adminCategoriesQuery } from '@/src/features/admin/lib/admin-queries'

export function useAdminCategories() {
  return useQuery(adminCategoriesQuery)
}
