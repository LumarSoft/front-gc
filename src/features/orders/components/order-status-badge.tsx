import { cn } from '@/src/lib/utils'
import type { OrderStatus } from '@/src/types/api/orders'
import { ORDER_LABELS } from '../lib/order-labels'

const TONES: Record<OrderStatus, string> = {
  PENDING_PAYMENT: 'bg-warning/10 text-warning',
  PAYMENT_UNDER_REVIEW: 'bg-warning/10 text-warning',
  CONFIRMED: 'bg-primary/10 text-primary',
  PREPARING: 'bg-primary/10 text-primary',
  READY_FOR_PICKUP: 'bg-success/10 text-success',
  SHIPPED: 'bg-primary/10 text-primary',
  DELIVERED: 'bg-success/10 text-success',
  CANCELLED: 'bg-muted text-muted-foreground',
  EXPIRED: 'bg-muted text-muted-foreground',
}

/** The order's current state as a short tinted label: amber waits on the buyer, green is ready or done. */
export function OrderStatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center rounded-full px-2.5 text-xs font-semibold whitespace-nowrap',
        TONES[status],
        className,
      )}
    >
      {ORDER_LABELS[status].label}
    </span>
  )
}
