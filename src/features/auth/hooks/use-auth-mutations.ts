'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import {
  forgotPassword,
  login,
  logout,
  register,
  resendVerification,
  resetPassword,
  verifyEmail,
} from '@/src/services/auth.service'
import type { AuthUser } from '@/src/types/api/auth'

/** Login and register return the user: store it so the header updates without another request. */
function useSessionMutation<TVariables>(mutationFn: (variables: TVariables) => Promise<AuthUser>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: async user => {
      // Never reuse an anonymous or another account's cart after a session change.
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.cart })
      queryClient.removeQueries({ queryKey: QUERY_KEYS.cart })
      queryClient.setQueryData(QUERY_KEYS.currentUser, user)
    },
  })
}

export function useLogin() {
  return useSessionMutation(login)
}

export function useRegister() {
  return useSessionMutation(register)
}

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.setQueryData(QUERY_KEYS.currentUser, null)
      queryClient.removeQueries({ predicate: query => query.queryKey[0] !== 'auth' })
    },
  })
}

export function useForgotPassword() {
  return useMutation({ mutationFn: forgotPassword })
}

export function useResetPassword() {
  return useMutation({ mutationFn: resetPassword })
}

export function useVerifyEmail() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser }),
  })
}

export function useResendVerification() {
  return useMutation({ mutationFn: resendVerification })
}
