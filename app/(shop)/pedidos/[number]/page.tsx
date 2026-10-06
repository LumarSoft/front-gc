import type { Metadata } from 'next'
import { OrderTrackingView } from '@/src/features/orders/components/order-tracking-view'

export const metadata: Metadata = {
  title: 'Seguimiento de pedido',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

export default async function OrderPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <p className="text-sm font-semibold text-primary">Seguimiento de tu compra</p>
      <h1 id="order-title" tabIndex={-1} className="mt-2 text-3xl font-extrabold outline-none">
        Pedido {number}
      </h1>
      <p className="mt-3 mb-8 text-muted-foreground">
        Los estados se actualizan cuando nuestro equipo avanza con tu pedido.
      </p>
      <OrderTrackingView number={number} />
    </div>
  )
}
