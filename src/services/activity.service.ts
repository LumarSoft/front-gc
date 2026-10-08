import { apiRequest } from '@/src/lib/api-client'
import type { ActivityReport } from '@/src/types/api/activity'

/** Fire and forget: survives a navigation, never refreshes the session and never throws. */
export function recordActivity(report: ActivityReport): void {
  apiRequest<void>('/activity', { method: 'POST', body: report, skipRefresh: true, keepalive: true }).catch(() => {
    // Stats only: a lost event must never bother the visitor.
  })
}
