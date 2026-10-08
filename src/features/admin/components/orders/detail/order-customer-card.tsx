import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { EmailLine, PhoneLine } from '@/src/features/admin/components/common/contact-lines'
import { ToneBadge } from '@/src/features/admin/components/common/tone-badge'
import type { Order } from '@/src/types/api/orders'

/** Who bought and how to reach them (email and phone open the mail and phone apps). */
export function OrderCustomerCard({ order }: { order: Order }) {
  const { name, email, phone } = order.customer
  return (
    <AdminCard
      title="Cliente"
      aside={
        order.guest && (
          <ToneBadge tone="neutral" dot={false}>
            Sin cuenta
          </ToneBadge>
        )
      }
    >
      <p className="text-sm font-medium">{name}</p>
      <div className="mt-3 flex flex-col gap-2">
        <EmailLine email={email} />
        <PhoneLine phone={phone} />
      </div>
    </AdminCard>
  )
}
