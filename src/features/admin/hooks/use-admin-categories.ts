'use client'

import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getAdminCategories } from '@/src/services/admin-catalog.service'

export function useAdminCategories() {
  return useQuery({ queryKey: QUERY_KEYS.admin.categories, queryFn: getAdminCategories })
}
