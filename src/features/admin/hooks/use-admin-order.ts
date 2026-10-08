'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ApiError } from '@/src/lib/api-client'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { changeOrderStatus, getAdminOrder, type ChangeOrderStatusRequest } from '@/src/services/orders.service'
import { HISTORY_LABELS } from '@/src/features/admin/lib/order-display'
import { useAdminMutation } from './use-admin-mutation'

/** One order and its state changes. Every change refreshes the lists, the counters and the cart stock. */
export function useAdminOrder(id: number) {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: QUERY_KEYS.admin.order(id),
    queryFn: () => getAdminOrder(id),
    refetchInterval: 30_000,
    retry: (failures, error) =>
      !(error instanceof ApiError && error.status >= 400 && error.status < 500) && failures < 2,
  })
  const mutation = useAdminMutation({
    mutationFn: (input: ChangeOrderStatusRequest) => changeOrderStatus(id, input),
    invalidate: [QUERY_KEYS.admin.orders, QUERY_KEYS.cart],
    successMessage: order => `${order.number}: ${HISTORY_LABELS[order.status].toLowerCase()}`,
    onSuccess: order => queryClient.setQueryData(QUERY_KEYS.admin.order(id), order),
  })
  return { query, mutation }
}
