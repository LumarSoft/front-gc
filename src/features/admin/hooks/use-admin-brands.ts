'use client'

import { useQuery } from '@tanstack/react-query'
import { adminBrandsQuery } from '@/src/features/admin/lib/admin-queries'

export function useAdminBrands() {
  return useQuery(adminBrandsQuery)
}
