import type { Metadata } from 'next'
import { CartView } from '@/src/features/cart/components/cart-view'

export const metadata: Metadata = { title: 'Tu carrito', robots: { index: false, follow: false } }

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <h1 className="text-3xl font-extrabold tracking-tight">Tu carrito</h1>
      <p className="mt-2 mb-8 text-muted-foreground">Todo lo que elegiste, en un solo lugar.</p>
      <CartView />
    </div>
  )
}
