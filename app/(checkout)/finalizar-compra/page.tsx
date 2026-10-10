import type { Metadata } from 'next'
import { CheckoutView } from '@/src/features/checkout/components/checkout-view'

export const metadata: Metadata = { title: 'Finalizar compra', robots: { index: false, follow: false } }

export default function CheckoutPage() {
  return (
    <>
      <h1 className="sr-only">Finalizar compra</h1>
      <CheckoutView />
    </>
  )
}
