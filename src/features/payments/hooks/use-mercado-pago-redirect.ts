'use client'

import { useMutation } from '@tanstack/react-query'
import { rememberOrderAccess } from '@/src/features/orders/lib/order-access'
import { startMercadoPagoPayment } from '@/src/services/orders.service'
import { paymentErrorMessage } from '../lib/payment-messages'

/** Sends the buyer to a new Mercado Pago checkout for the order, keeping its access for the way back. */
export function useMercadoPagoRedirect() {
  const mutation = useMutation({
    mutationFn: ({ number, accessToken }: { number: string; accessToken: string }) =>
      startMercadoPagoPayment(number, accessToken),
    onSuccess: ({ checkoutUrl }, { number, accessToken }) => {
      rememberOrderAccess(number, accessToken)
      window.location.assign(checkoutUrl)
    },
  })
  return {
    redirect: (number: string, accessToken: string) => mutation.mutateAsync({ number, accessToken }),
    // Still pending while the browser leaves for Mercado Pago.
    pending: mutation.isPending || mutation.isSuccess,
    error: mutation.error ? paymentErrorMessage(mutation.error) : null,
  }
}
