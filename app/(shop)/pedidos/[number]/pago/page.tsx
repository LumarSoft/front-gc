import type { Metadata } from 'next'
import { PaymentReturnView } from '@/src/features/payments/components/payment-return-view'

export const metadata: Metadata = {
  title: 'Pago de tu pedido',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

/** Mercado Pago's return URL (success, failure and pending alike): the result comes from the API, not the query. */
export default async function OrderPaymentPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <p className="text-sm font-semibold text-primary">Pago con Mercado Pago</p>
      <h1 className="mt-2 mb-8 text-3xl font-extrabold">Tu pago</h1>
      <PaymentReturnView number={number} />
    </div>
  )
}
