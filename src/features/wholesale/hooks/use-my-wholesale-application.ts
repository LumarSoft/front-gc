'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCurrentUser } from '@/src/features/auth/hooks/use-current-user'
import { ApiError } from '@/src/lib/api-client'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { applyForWholesale, getMyWholesaleApplication } from '@/src/services/wholesale.service'

/** The signed-in customer's frequent-customer application, and sending a new one. */
export function useMyWholesaleApplication() {
  const queryClient = useQueryClient()
  const session = useCurrentUser()
  const userId = session.data?.id ?? null
  const queryKey = QUERY_KEYS.wholesaleFor(userId ?? 0)
  const query = useQuery({ queryKey, queryFn: getMyWholesaleApplication, enabled: userId !== null })
  const apply = useMutation({
    mutationFn: applyForWholesale,
    onSuccess: data => {
      queryClient.setQueryData(queryKey, data)
      // The header and "Mi cuenta" read the company from the session.
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser })
    },
  })
  const applyError = apply.error
    ? apply.error instanceof ApiError && [409, 422].includes(apply.error.status)
      ? apply.error.message
      : 'No pudimos enviar la solicitud. Revisá tu conexión y probá de nuevo.'
    : null
  return { session, query, apply, applyError }
}
