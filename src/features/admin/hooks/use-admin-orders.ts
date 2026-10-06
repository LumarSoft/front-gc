'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { changeOrderStatus, getAdminOrder, getAdminOrders } from '@/src/services/orders.service'
import type { OrderStatus } from '@/src/types/api/orders'
import { useAdminMutation } from './use-admin-mutation'

export function useAdminOrders() {
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<OrderStatus | ''>('')
  const query = useQuery({
    queryKey: QUERY_KEYS.admin.orderList(page, status),
    queryFn: () => getAdminOrders(page, status),
    refetchInterval: 30_000,
  })
  const filter = (value: OrderStatus | ''): void => {
    setPage(1)
    setStatus(value)
  }
  return { query, page, setPage, status, filter }
}

export function useAdminOrder(id: number) {
  const [paymentReceived, setPaymentReceived] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)
  const query = useQuery({
    queryKey: QUERY_KEYS.admin.order(id),
    queryFn: () => getAdminOrder(id),
    refetchInterval: 30_000,
  })
  const mutation = useAdminMutation({
    mutationFn: (status: OrderStatus) => changeOrderStatus(id, status, paymentReceived),
    invalidate: [QUERY_KEYS.admin.orders, QUERY_KEYS.cart],
    successMessage: 'Estado del pedido actualizado',
    onSuccess: () => setPaymentReceived(false),
  })
  const requestStatus = (status: OrderStatus): void => {
    if (status === 'CANCELLED') setCancelOpen(true)
    else mutation.mutate(status)
  }
  return {
    query,
    mutation,
    paymentReceived,
    setPaymentReceived,
    cancelOpen,
    setCancelOpen,
    requestStatus,
    cancel: () => mutation.mutate('CANCELLED'),
  }
}
