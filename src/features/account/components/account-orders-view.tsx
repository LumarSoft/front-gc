'use client'

import Link from 'next/link'
import { PackageIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { EmptyState } from '@/src/components/ui/empty-state'
import { useAccountUser } from '@/src/features/account/hooks/use-account-user'
import { useMyOrders } from '@/src/features/account/hooks/use-my-orders'
import { AccountOrderRow, AccountOrderRowsSkeleton } from './account-order-row'
import { AccountOrdersPagination } from './account-orders-pagination'
import { AccountPageHeader } from './account-page-header'
import { GuestOrdersHint } from './guest-orders-hint'

function OrdersList({ page }: { page: number }) {
  const query = useMyOrders(page)
  if (query.isPending) return <AccountOrderRowsSkeleton rows={4} />
  if (query.isError)
    return (
      <div role="alert" className="rounded-2xl border p-6">
        <p>No pudimos cargar tus pedidos. Revisá tu conexión y probá de nuevo.</p>
        <Button className="mt-4 h-10 rounded-full px-5" onClick={() => void query.refetch()}>
          Reintentar
        </Button>
      </div>
    )
  const { items, total, totalPages } = query.data
  if (!items.length)
    return (
      <div className="rounded-2xl border">
        <EmptyState
          icon={<PackageIcon weight="light" />}
          title={total ? 'Esta página no tiene pedidos' : 'Todavía no hiciste pedidos'}
          description={
            total
              ? 'Volvé al principio de la lista para ver tus pedidos más recientes.'
              : 'Cuando compres con tu cuenta, vas a seguir acá el estado de cada pedido.'
          }
          action={
            <Button asChild className="h-10 rounded-full px-5">
              {total ? (
                <Link href="/mi-cuenta/pedidos">Ver los más recientes</Link>
              ) : (
                <Link href="/productos">Ver productos</Link>
              )}
            </Button>
          }
        />
      </div>
    )
  return (
    <>
      <ul className="flex flex-col gap-3" aria-busy={query.isPlaceholderData}>
        {items.map(order => (
          <AccountOrderRow key={order.id} order={order} />
        ))}
      </ul>
      <AccountOrdersPagination page={page} totalPages={totalPages} />
    </>
  )
}

export function AccountOrdersView({ page }: { page: number }) {
  const { data: user, isError } = useAccountUser(page > 1 ? `/mi-cuenta/pedidos?pagina=${page}` : '/mi-cuenta/pedidos')
  return (
    <div className="flex flex-col gap-8">
      <AccountPageHeader
        trail={[{ label: 'Mis pedidos', href: '/mi-cuenta/pedidos' }]}
        title="Mis pedidos"
        description="Los pedidos que hiciste con tu cuenta, del más reciente al más viejo."
      />
      {isError ? (
        <p className="text-muted-foreground">No pudimos cargar tu cuenta. Recargá la página en unos minutos.</p>
      ) : user ? (
        <div>
          <OrdersList page={page} />
        </div>
      ) : (
        <AccountOrderRowsSkeleton rows={4} />
      )}
      <GuestOrdersHint />
    </div>
  )
}
