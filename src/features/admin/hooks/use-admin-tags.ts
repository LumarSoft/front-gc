'use client'

import { useQuery } from '@tanstack/react-query'
import { adminTagsQuery } from '@/src/features/admin/lib/admin-queries'

export function useAdminTags() {
  return useQuery(adminTagsQuery)
}
