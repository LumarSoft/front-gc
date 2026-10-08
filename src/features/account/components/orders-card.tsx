'use client'

import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { AccountCard } from '@/src/features/account/components/account-card'
import { useMyOrders } from '@/src/features/account/hooks/use-my-orders'
import { AccountOrderRow, AccountOrderRowsSkeleton } from './account-order-row'
import { GuestOrdersHint } from './guest-orders-hint'

const LATEST = 3

/** The latest orders of the account, with a way to the full list. */
export function OrdersCard() {
  const query = useMyOrders(1, LATEST)
  const total = query.data?.total ?? 0
  return (
    <AccountCard
      title="Mis pedidos"
      className="md:col-span-2"
      action={
        total > LATEST && (
          <Link href="/mi-cuenta/pedidos" className="text-sm font-semibold text-primary hover:underline">
            Ver los {total}
          </Link>
        )
      }
    >
      {query.isPending ? (
        <AccountOrderRowsSkeleton rows={2} />
      ) : query.isError ? (
        <div role="alert" className="flex flex-col items-start gap-3">
          <p className="text-sm text-muted-foreground">No pudimos cargar tus pedidos.</p>
          <Button variant="outline" className="h-10 rounded-full px-5" onClick={() => void query.refetch()}>
            Reintentar
          </Button>
        </div>
      ) : total === 0 ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-muted-foreground">
            Todavía no hiciste pedidos con tu cuenta. Cuando compres, vas a ver acá su estado.
          </p>
          <Button asChild className="h-10 rounded-full px-5">
            <Link href="/productos">Ver productos</Link>
          </Button>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {query.data.items.map(order => (
            <AccountOrderRow key={order.id} order={order} />
          ))}
        </ul>
      )}
      <div className="mt-auto border-t pt-3">
        <GuestOrdersHint />
      </div>
    </AccountCard>
  )
}
