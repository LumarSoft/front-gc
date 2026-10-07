'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import {
  decideWholesaleApplication,
  getAdminWholesaleApplication,
  getAdminWholesaleApplications,
} from '@/src/services/wholesale.service'
import type { WholesaleStatus } from '@/src/types/api/auth'
import type { WholesaleDecision } from '@/src/types/api/wholesale'
import { useAdminMutation } from './use-admin-mutation'

export function useAdminWholesaleApplications() {
  const [page, setPage] = useState(1)
  // Pending first: that is the staff's to-do list.
  const [status, setStatus] = useState<WholesaleStatus | ''>('PENDING')
  const query = useQuery({
    queryKey: QUERY_KEYS.admin.wholesaleApplicationList(page, status),
    queryFn: () => getAdminWholesaleApplications(page, status),
  })
  const filter = (value: WholesaleStatus | ''): void => {
    setPage(1)
    setStatus(value)
  }
  return { query, status, filter, setPage }
}

const SUCCESS: Record<WholesaleDecision, string> = {
  approve: 'Cuenta aprobada',
  reject: 'Solicitud rechazada',
  pause: 'Cuenta pausada',
  resume: 'Cuenta reactivada',
}

/** Decisions that must tell the customer why. */
export const DECISIONS_WITH_REASON: WholesaleDecision[] = ['reject', 'pause']

export function useAdminWholesaleApplication(id: number) {
  const [pendingDecision, setPendingDecision] = useState<WholesaleDecision | null>(null)
  const query = useQuery({
    queryKey: QUERY_KEYS.admin.wholesaleApplication(id),
    queryFn: () => getAdminWholesaleApplication(id),
  })
  const mutation = useAdminMutation({
    mutationFn: ({ decision, note }: { decision: WholesaleDecision; note?: string }) =>
      decideWholesaleApplication(id, decision, note),
    invalidate: [QUERY_KEYS.admin.wholesaleApplications],
    successMessage: (_, { decision }) => SUCCESS[decision],
    onSuccess: () => setPendingDecision(null),
  })
  return {
    query,
    mutation,
    pendingDecision,
    /** Opens the dialog; approve and resume confirm without a reason. */
    request: setPendingDecision,
    closeDialog: () => setPendingDecision(null),
    decide: (note?: string) => pendingDecision && mutation.mutate({ decision: pendingDecision, note }),
  }
}
