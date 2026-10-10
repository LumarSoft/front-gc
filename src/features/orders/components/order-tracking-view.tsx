'use client'

import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { CartSkeleton } from '@/src/features/cart/components/cart-skeleton'
import { OrderOnlinePayment } from '@/src/features/payments/components/order-online-payment'
import { canPayOnline } from '@/src/features/payments/lib/payment-window'
import { useOrderTracking } from '../hooks/use-order-tracking'
import { OrderDetails } from './order-details'
import { OrderProgress } from './order-progress'

export function OrderTrackingView({ number }: { number: string }) {
  const { query, token, copied, copyLink } = useOrderTracking(number)
  if (!token)
    return (
      <div className="rounded-2xl border p-6">
        <h2 className="text-xl font-bold">Necesitás el enlace privado de tu pedido</h2>
        <p className="mt-3 text-muted-foreground">
          Abrí el enlace completo que guardaste al confirmar la compra. El número de pedido por sí solo no permite
          consultar tus datos.
        </p>
      </div>
    )
  if (query.isPending) return <CartSkeleton />
  if (query.isError)
    return (
      <div role="alert" className="rounded-2xl border p-6">
        <p>No pudimos consultar este pedido. Revisá que el enlace esté completo y probá de nuevo.</p>
        <Button className="mt-4 rounded-full" onClick={() => void query.refetch()}>
          Reintentar
        </Button>
      </div>
    )
  return (
    <div className="space-y-8">
      {canPayOnline(query.data) && <OrderOnlinePayment order={query.data} accessToken={token} />}
      <section className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
        <h2 className="font-bold">Guardá tu enlace de seguimiento</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Guardá el enlace en tus favoritos o copialo para volver sin una cuenta. Por ahora no lo enviamos por email.
          Compartilo solo con personas de confianza: permite ver los datos de tu pedido.
        </p>
        <Button variant="outline" className="mt-4 rounded-full" onClick={() => void copyLink()}>
          {copied ? 'Enlace copiado' : 'Copiar enlace privado'}
        </Button>
      </section>
      <div className="grid items-start gap-6 lg:grid-cols-3">
        <div className="lg:col-start-3 lg:row-start-1">
          <OrderProgress order={query.data} />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1">
          <OrderDetails order={query.data} />
        </div>
      </div>
      <Button variant="outline" className="rounded-full" asChild>
        <Link href="/productos">Seguir comprando</Link>
      </Button>
    </div>
  )
}
