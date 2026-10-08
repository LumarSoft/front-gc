'use client'

import { ArrowLeftIcon, ChevronDownIcon, CircleXIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { OrderFulfillmentBadge, OrderPaymentBadge } from '@/src/features/admin/components/orders/order-badges'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import type { Order } from '@/src/types/api/orders'

type OrderHeaderProps = {
  order: Order
  canCancel: boolean
  onCancel: () => void
}

/** Number and both states at a glance; secondary actions in "Más acciones". */
export function OrderHeader({ order, canCancel, onCancel }: OrderHeaderProps) {
  return (
    <header className="mb-4 flex flex-wrap items-start gap-x-3 gap-y-2 sm:mb-5">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/admin/pedidos" aria-label="Volver a pedidos">
          <ArrowLeftIcon className="size-4.5" />
        </Link>
      </Button>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight">{order.number}</h1>
          <OrderPaymentBadge status={order.status} />
          <OrderFulfillmentBadge status={order.status} delivery={order.deliveryMethod} />
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {formatOrderDate(order.placedAt)} · {order.guest ? 'Compra sin cuenta' : 'Cliente con cuenta'}
        </p>
      </div>
      {canCancel && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Más acciones
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem variant="destructive" onSelect={onCancel}>
              <CircleXIcon />
              Cancelar pedido
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  )
}
