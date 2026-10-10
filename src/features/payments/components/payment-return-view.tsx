'use client'

import { Button } from '@/src/components/ui/button'
import { CartSkeleton } from '@/src/features/cart/components/cart-skeleton'
import { usePaymentReturn } from '../hooks/use-payment-return'
import { PaymentResult } from './payment-result'

/** Where Mercado Pago sends the buyer back, whatever happened there. */
export function PaymentReturnView({ number }: { number: string }) {
  const { token, query, polling } = usePaymentReturn(number)
  if (!token)
    return (
      <div className="rounded-2xl border p-6">
        <h2 className="text-xl font-bold">Abrí el enlace privado de tu pedido</h2>
        <p className="mt-3 text-muted-foreground">
          No encontramos el acceso a este pedido en este navegador. Abrí el enlace de seguimiento que guardaste al
          confirmar la compra para ver si el pago se aprobó.
        </p>
      </div>
    )
  if (query.isPending) return <CartSkeleton />
  if (query.isError)
    return (
      <div role="alert" className="rounded-2xl border p-6">
        <p>No pudimos consultar el pago de este pedido. Probá de nuevo en unos segundos.</p>
        <Button className="mt-4 rounded-full" onClick={() => void query.refetch()}>
          Reintentar
        </Button>
      </div>
    )
  return (
    <PaymentResult order={query.data} accessToken={token} polling={polling} onCheckAgain={() => void query.refetch()} />
  )
}
