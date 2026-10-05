import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckoutView } from '@/src/features/checkout/components/checkout-view'

export const metadata: Metadata = { title: 'Finalizar compra', robots: { index: false, follow: false } }

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <Link href="/productos" className="text-sm font-semibold text-primary hover:underline">
        ← Seguir comprando
      </Link>
      <h1 className="mt-5 text-3xl font-extrabold tracking-tight">Finalizar compra</h1>
      <p className="mt-2 mb-8 text-muted-foreground">Prepará tus datos y elegí cómo recibir tu compra.</p>
      <CheckoutView />
    </div>
  )
}
