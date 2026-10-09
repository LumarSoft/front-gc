'use client'

import { InboxIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { DetailSkeleton } from '@/src/features/admin/components/common/detail-skeleton'
import { EmptyState } from '@/src/components/ui/empty-state'
import { QueryErrorState } from '@/src/features/admin/components/feedback/query-error-state'
import { CancelOrderDialog } from '@/src/features/admin/components/orders/detail/cancel-order-dialog'
import { ConfirmPaymentDialog } from '@/src/features/admin/components/orders/detail/confirm-payment-dialog'
import { OrderCustomerCard } from '@/src/features/admin/components/orders/detail/order-customer-card'
import { OrderDeliveryCard } from '@/src/features/admin/components/orders/detail/order-delivery-card'
import { OrderHeader } from '@/src/features/admin/components/orders/detail/order-header'
import { OrderItemsCard } from '@/src/features/admin/components/orders/detail/order-items-card'
import { OrderPaymentCard } from '@/src/features/admin/components/orders/detail/order-payment-card'
import { OrderTimelineCard } from '@/src/features/admin/components/orders/detail/order-timeline-card'
import { OrderShipmentCard } from '@/src/features/admin/components/orders/detail/shipment/order-shipment-card'
import { useAdminOrder } from '@/src/features/admin/hooks/use-admin-order'
import { useOrderActions } from '@/src/features/admin/hooks/use-order-actions'
import { ApiError } from '@/src/lib/api-client'

/** One order, Shopify style: what to prepare and the payment on the left, customer and delivery on the right. */
export function OrderView({ id }: { id: number }) {
  const { query, mutation } = useAdminOrder(id)
  const actions = useOrderActions(query.data, mutation)

  if (query.isPending) return <DetailSkeleton label="Cargando pedido" />
  if (query.isError) {
    const missing = query.error instanceof ApiError && query.error.status === 404
    return (
      <Card className="py-0">
        {missing ? (
          <EmptyState
            icon={<InboxIcon />}
            title="No encontramos este pedido"
            description="Puede que el link esté mal escrito. Buscalo por número en la lista."
            action={
              <Button variant="outline" asChild>
                <Link href="/admin/pedidos">Ver pedidos</Link>
              </Button>
            }
          />
        ) : (
          <QueryErrorState message="No pudimos cargar este pedido." onRetry={() => void query.refetch()} />
        )}
      </Card>
    )
  }

  const order = query.data
  return (
    <>
      <OrderHeader order={order} canCancel={actions.canCancel} onCancel={() => actions.setDialog('cancel')} />
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex min-w-0 flex-col gap-4">
          <OrderItemsCard
            order={order}
            nextStep={actions.nextStep}
            pending={actions.pending}
            onStep={actions.runStep}
          />
          {order.shipment && <OrderShipmentCard order={order} shipment={order.shipment} />}
          <OrderPaymentCard
            order={order}
            canConfirm={actions.nextStep === 'CONFIRMED'}
            pending={actions.pending}
            onConfirm={() => actions.setDialog('payment')}
          />
          <OrderTimelineCard history={order.history} />
        </div>
        <div className="flex flex-col gap-4">
          <OrderCustomerCard order={order} />
          <OrderDeliveryCard order={order} />
        </div>
      </div>
      <ConfirmPaymentDialog
        order={order}
        open={actions.dialog === 'payment'}
        onOpenChange={open => actions.setDialog(open ? 'payment' : null)}
        pending={actions.pending}
        onConfirm={actions.confirmPayment}
      />
      <CancelOrderDialog
        order={order}
        open={actions.dialog === 'cancel'}
        onOpenChange={open => actions.setDialog(open ? 'cancel' : null)}
        pending={actions.pending}
        onCancel={actions.cancel}
      />
    </>
  )
}
