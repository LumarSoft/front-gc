'use client'

import { useUnansweredQuestionCounts } from '@/src/features/admin/hooks/use-admin-assistant'
import { useAdminOrderCounts } from '@/src/features/admin/hooks/use-admin-orders'
import { useAdminWholesaleCounts } from '@/src/features/admin/hooks/use-admin-wholesale'
import type { AdminNavBadge } from '@/src/features/admin/lib/admin-nav'

/**
 * Numbers shown next to sections: orders still to be paid or prepared, applications waiting for review, questions the
 * assistant could not answer.
 */
export function useAdminNavBadges(): Record<AdminNavBadge, number | undefined> {
  const { data: orders } = useAdminOrderCounts()
  const { data: wholesale } = useAdminWholesaleCounts()
  const { data: questions } = useUnansweredQuestionCounts()
  return {
    ordersWaiting: orders ? orders.PENDING_PAYMENT + orders.TO_FULFILL : undefined,
    wholesalePending: wholesale?.PENDING,
    assistantQuestionsOpen: questions?.OPEN,
  }
}
