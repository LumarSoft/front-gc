'use client'

import { useAdminOrderCounts } from '@/src/features/admin/hooks/use-admin-orders'
import type { AdminNavBadge } from '@/src/features/admin/lib/admin-nav'

/** Numbers shown next to sections: orders still to be paid or prepared. */
export function useAdminNavBadges(): Record<AdminNavBadge, number | undefined> {
  const { data } = useAdminOrderCounts()
  return { ordersWaiting: data ? data.PENDING_PAYMENT + data.TO_FULFILL : undefined }
}
