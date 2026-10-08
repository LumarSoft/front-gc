'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getAdminOrderCounts, getAdminOrders } from '@/src/services/orders.service'
import type { AdminOrdersQuery } from '@/src/types/api/orders'

/** New orders arrive on their own: lists and counters refresh every 30 s while the panel is open. */
const REFRESH_MS = 30_000

export function useAdminOrders(query: AdminOrdersQuery) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.orderList(query),
    queryFn: () => getAdminOrders(query),
    placeholderData: keepPreviousData,
    refetchInterval: REFRESH_MS,
  })
}

/** Orders waiting in each open stage: the "Pedidos" badge and the list views. */
export function useAdminOrderCounts() {
  return useQuery({
    queryKey: QUERY_KEYS.admin.orderCounts,
    queryFn: getAdminOrderCounts,
    refetchInterval: REFRESH_MS,
  })
}
