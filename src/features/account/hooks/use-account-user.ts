'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useCurrentUser } from '@/src/features/auth/hooks/use-current-user'

/**
 * The logged-in user for account pages. Visitors who arrive without a session are sent to login;
 * after a logout nothing happens here, because the logout handler already navigates home.
 */
export function useAccountUser() {
  const router = useRouter()
  const query = useCurrentUser()
  const { data: user, isPending, isError } = query
  const hadSession = useRef(false)

  useEffect(() => {
    if (user) hadSession.current = true
  }, [user])

  useEffect(() => {
    if (!isPending && !isError && !user && !hadSession.current) router.replace('/ingresar?redirect=/mi-cuenta')
  }, [isPending, isError, user, router])

  return query
}
