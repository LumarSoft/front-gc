import { CircleNotchIcon, PackageIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { OrderFulfillmentBadge } from '@/src/features/admin/components/orders/order-badges'
import { DELIVERY_LABELS, NEXT_STEP_LABELS } from '@/src/features/admin/lib/order-display'
import { formatMoneyExact } from '@/src/lib/format'
import type { Order, OrderStatus } from '@/src/types/api/orders'

type OrderItemsCardProps = {
  order: Order
  nextStep: OrderStatus | undefined
  pending: boolean
  onStep: (status: OrderStatus) => void
}

/** What to prepare, and the button that moves the order forward once it is paid. */
export function OrderItemsCard({ order, nextStep, pending, onStep }: OrderItemsCardProps) {
  const fulfillmentStep = nextStep && nextStep !== 'CONFIRMED' ? nextStep : undefined
  const waitingPayment = nextStep === 'CONFIRMED'

  return (
    <AdminCard
      title={
        <span className="flex items-center gap-2">
          <OrderFulfillmentBadge status={order.status} delivery={order.deliveryMethod} />
          <span className="font-normal text-muted-foreground">{DELIVERY_LABELS[order.deliveryMethod]}</span>
        </span>
      }
      footer={
        fulfillmentStep ? (
          <Button onClick={() => onStep(fulfillmentStep)} disabled={pending}>
            {pending && <CircleNotchIcon className="animate-spin" />}
            {NEXT_STEP_LABELS[fulfillmentStep]}
          </Button>
        ) : waitingPayment ? (
          <p className="text-sm text-muted-foreground">Se prepara cuando verifiques el pago.</p>
        ) : undefined
      }
    >
      <ul className="flex flex-col gap-3">
        {order.items.map(item => (
          <li key={item.sku} className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg border bg-background text-muted-foreground">
              <PackageIcon className="size-5" />
            </span>
            {/* Phones: price under the name. From sm: name, unit price and line total in one row. */}
            <div className="min-w-0 flex-1 sm:flex sm:items-start sm:gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {[item.variantName, `SKU ${item.sku}`].filter(Boolean).join(' · ')}
                </p>
              </div>
              <div className="mt-1 flex justify-between gap-4 sm:contents">
                <p className="shrink-0 text-sm text-muted-foreground tabular-nums">
                  {formatMoneyExact(item.unitPrice)} × {item.quantity}
                </p>
                <p className="shrink-0 text-right text-sm tabular-nums sm:w-28">{formatMoneyExact(item.total)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </AdminCard>
  )
}
