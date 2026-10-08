'use client'

import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { useAccountUser } from '@/src/features/account/hooks/use-account-user'
import { useMyOrder } from '@/src/features/account/hooks/use-my-orders'
import { CartSkeleton } from '@/src/features/cart/components/cart-skeleton'
import { OrderDetails } from '@/src/features/orders/components/order-details'
import { OrderProgress } from '@/src/features/orders/components/order-progress'
import { ApiError } from '@/src/lib/api-client'
import { AccountPageHeader } from './account-page-header'

function OrderBody({ number }: { number: string }) {
  const query = useMyOrder(number)
  if (query.isPending) return <CartSkeleton />
  if (query.isError) {
    const missing = query.error instanceof ApiError && (query.error.status === 404 || query.error.status === 400)
    return (
      <div role="alert" className="rounded-2xl border p-6">
        <p>
          {missing
            ? 'No encontramos este pedido en tu cuenta. Si lo hiciste sin ingresar, abrilo con su enlace privado.'
            : 'No pudimos consultar este pedido. Revisá tu conexión y probá de nuevo.'}
        </p>
        {missing ? (
          <Button asChild variant="outline" className="mt-4 h-10 rounded-full px-5">
            <Link href="/mi-cuenta/pedidos">Ver mis pedidos</Link>
          </Button>
        ) : (
          <Button className="mt-4 h-10 rounded-full px-5" onClick={() => void query.refetch()}>
            Reintentar
          </Button>
        )}
      </div>
    )
  }
  return (
    <div className="grid items-start gap-6 lg:grid-cols-3">
      <div className="lg:col-start-3 lg:row-start-1">
        <OrderProgress order={query.data} />
      </div>
      <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1">
        <OrderDetails order={query.data} />
      </div>
    </div>
  )
}

export function AccountOrderView({ number }: { number: string }) {
  const { data: user, isError } = useAccountUser(`/mi-cuenta/pedidos/${number}`)
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        trail={[
          { label: 'Mis pedidos', href: '/mi-cuenta/pedidos' },
          { label: number, href: `/mi-cuenta/pedidos/${number}` },
        ]}
        title={`Pedido ${number}`}
      />
      {isError ? (
        <p className="text-muted-foreground">No pudimos cargar tu cuenta. Recargá la página en unos minutos.</p>
      ) : user ? (
        <OrderBody number={number} />
      ) : (
        <CartSkeleton />
      )}
    </div>
  )
}
