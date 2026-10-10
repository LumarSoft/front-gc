'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useTrackActivity } from '@/src/features/activity/hooks/use-track-activity'
import { cartErrorMessage } from '@/src/features/cart/lib/cart-messages'
import { finishPendingOrder, orderPath, pendingOrderToken } from '@/src/features/orders/lib/order-access'
import { useMercadoPagoRedirect } from '@/src/features/payments/hooks/use-mercado-pago-redirect'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { placeOrder } from '@/src/services/orders.service'
import type { Checkout, CheckoutPaymentMethod } from '@/src/types/api/checkout'

const isCheckoutQuery = (key: readonly unknown[]): boolean => key.includes('checkout')

export function usePlaceOrder(checkout: Checkout, paymentMethod: CheckoutPaymentMethod) {
  const client = useQueryClient()
  const router = useRouter()
  const { track } = useTrackActivity()
  const mercadoPago = useMercadoPagoRedirect()
  const mutation = useMutation({
    mutationKey: QUERY_KEYS.cart,
    scope: { id: 'cart' },
    mutationFn: async () => {
      const customer = checkout.customer!
      const accessToken = pendingOrderToken()
      const order = await placeOrder({
        name: customer.name,
        email: customer.email,
        ...(customer.phone ? { phone: customer.phone } : {}),
        deliveryMethod: checkout.deliveryMethod,
        ...(checkout.shippingAddress ? { shippingAddress: checkout.shippingAddress } : {}),
        ...(checkout.shippingQuote ? { shippingQuoteId: checkout.shippingQuote.id } : {}),
        reviewToken: checkout.reviewToken!,
        accessToken,
        paymentMethod,
      })
      return { order, accessToken }
    },
    onMutate: () => client.cancelQueries({ queryKey: QUERY_KEYS.cart }),
    onSuccess: ({ order, accessToken }) => {
      track({ type: 'ORDER_PLACED' })
      // Keep the retry token until navigation: even a failure here can safely recover the created order.
      if (order.paymentMethod === 'MERCADO_PAGO')
        void mercadoPago.redirect(order.number, accessToken).catch(() => {
          // The order exists and holds the stock: its page offers paying again.
          toast.error('Tu pedido quedó registrado, pero no pudimos abrir Mercado Pago. Probá pagar desde acá.')
          router.replace(orderPath(order.number, accessToken))
        })
      else router.replace(orderPath(order.number, accessToken))
      finishPendingOrder()
      // The cart is now an order. Refetching the checkout while this page is still shown would flash "Tu carrito
      // está vacío" before the navigation lands, so it is only marked stale; the header's cart updates right away.
      void client.invalidateQueries({ queryKey: QUERY_KEYS.cart, predicate: query => !isCheckoutQuery(query.queryKey) })
      void client.invalidateQueries({
        queryKey: QUERY_KEYS.cart,
        predicate: query => isCheckoutQuery(query.queryKey),
        refetchType: 'none',
      })
      void client.invalidateQueries({ queryKey: QUERY_KEYS.myOrders })
    },
    onError: () => {
      void client.invalidateQueries({ queryKey: QUERY_KEYS.cart })
    },
  })
  return {
    confirm: () => mutation.mutate(),
    pending: mutation.isPending || mutation.isSuccess,
    error: mutation.error ? cartErrorMessage(mutation.error) : null,
  }
}
