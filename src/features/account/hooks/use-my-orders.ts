'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useCurrentUser } from '@/src/features/auth/hooks/use-current-user'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getMyOrder, getMyOrders } from '@/src/services/orders.service'

/** One page of the signed-in customer's orders. Waits for the session; account pages redirect visitors. */
export function useMyOrders(page: number, pageSize = 10) {
  const { data: user } = useCurrentUser()
  return useQuery({
    queryKey: QUERY_KEYS.myOrderList(user?.id ?? 0, page, pageSize),
    queryFn: () => getMyOrders(page, pageSize),
    enabled: Boolean(user),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  })
}

/** One of the customer's orders; refreshed like the private tracking page so staff updates show up. */
export function useMyOrder(number: string) {
  const { data: user } = useCurrentUser()
  return useQuery({
    queryKey: QUERY_KEYS.myOrder(user?.id ?? 0, number),
    queryFn: () => getMyOrder(number),
    enabled: Boolean(user),
    retry: false,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  })
}
