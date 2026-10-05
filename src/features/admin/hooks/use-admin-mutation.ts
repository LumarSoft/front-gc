'use client'

import { type QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { adminErrorMessage } from '@/src/features/admin/lib/admin-error-message'

type AdminMutationOptions<TVariables, TData> = {
  mutationFn: (variables: TVariables) => Promise<TData>
  /** Lists to reload after a successful change. */
  invalidate: QueryKey[]
  /** Toast shown on success; a function receives the result (e.g. the saved name). */
  successMessage: string | ((data: TData, variables: TVariables) => string)
  /** Extra work after success, e.g. storing the returned record in the cache. */
  onSuccess?: (data: TData, variables: TVariables) => void
}

/** Every admin write: toast on success or with the reason on error, then refresh the affected lists. */
export function useAdminMutation<TVariables, TData>({
  mutationFn,
  invalidate,
  successMessage,
  onSuccess,
}: AdminMutationOptions<TVariables, TData>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: async (data, variables) => {
      onSuccess?.(data, variables)
      toast.success(typeof successMessage === 'function' ? successMessage(data, variables) : successMessage)
      await Promise.all(invalidate.map(queryKey => queryClient.invalidateQueries({ queryKey })))
    },
    onError: error => toast.error(adminErrorMessage(error)),
  })
}
