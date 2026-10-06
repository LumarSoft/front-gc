'use client'

import { useQuery } from '@tanstack/react-query'
import { useCurrentUser } from '@/src/features/auth/hooks/use-current-user'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getFavorites } from '@/src/services/favorites.service'

/** The signed-in customer's favorites. Guests have none: `signedIn` is false and nothing is fetched. */
export function useFavorites() {
  const session = useCurrentUser()
  const userId = session.data?.id ?? null
  const query = useQuery({
    queryKey: QUERY_KEYS.favoritesFor(userId ?? 0),
    queryFn: getFavorites,
    enabled: userId !== null,
    staleTime: 60_000,
  })
  return { query, userId, signedIn: userId !== null, sessionPending: session.isPending }
}
