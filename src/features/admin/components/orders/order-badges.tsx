import { ToneBadge } from '@/src/features/admin/components/common/tone-badge'
import { fulfillmentBadge, paymentBadge } from '@/src/features/admin/lib/order-display'
import type { DeliveryMethod } from '@/src/types/api/checkout'
import type { OrderStatus } from '@/src/types/api/orders'

export function OrderPaymentBadge({ status }: { status: OrderStatus }) {
  const badge = paymentBadge(status)
  return <ToneBadge tone={badge.tone}>{badge.label}</ToneBadge>
}

export function OrderFulfillmentBadge({ status, delivery }: { status: OrderStatus; delivery: DeliveryMethod }) {
  const badge = fulfillmentBadge(status, delivery)
  return badge ? <ToneBadge tone={badge.tone}>{badge.label}</ToneBadge> : null
}
