'use client'

import { useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import {
  decideWholesaleApplication,
  getAdminWholesaleApplication,
  getAdminWholesaleApplications,
  getAdminWholesaleCounts,
} from '@/src/services/wholesale.service'
import type { AdminWholesaleQuery, WholesaleDecision } from '@/src/types/api/wholesale'
import { useAdminMutation } from './use-admin-mutation'

/** Customers apply on their own: the counters refresh every minute while the panel is open. */
const REFRESH_MS = 60_000

export function useAdminWholesaleApplications(query: AdminWholesaleQuery) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.wholesaleApplicationList(query),
    queryFn: () => getAdminWholesaleApplications(query),
    placeholderData: keepPreviousData,
  })
}

/** Applications per status: the list views and the "Clientes frecuentes" badge (pending ones). */
export function useAdminWholesaleCounts() {
  return useQuery({
    queryKey: QUERY_KEYS.admin.wholesaleCounts,
    queryFn: getAdminWholesaleCounts,
    refetchInterval: REFRESH_MS,
  })
}

const SUCCESS: Record<WholesaleDecision, string> = {
  approve: 'Cuenta aprobada',
  reject: 'Solicitud rechazada',
  pause: 'Cuenta pausada',
  resume: 'Cuenta reactivada',
}

export function useAdminWholesaleApplication(id: number) {
  const [pendingDecision, setPendingDecision] = useState<WholesaleDecision | null>(null)
  const query = useQuery({
    queryKey: QUERY_KEYS.admin.wholesaleApplication(id),
    queryFn: () => getAdminWholesaleApplication(id),
  })
  const mutation = useAdminMutation({
    mutationFn: ({ decision, note }: { decision: WholesaleDecision; note?: string }) =>
      decideWholesaleApplication(id, decision, note),
    // The prefix covers the lists, the counters and this application; the home's to-dos read the dashboard.
    invalidate: [QUERY_KEYS.admin.wholesaleApplications, QUERY_KEYS.admin.dashboard],
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
