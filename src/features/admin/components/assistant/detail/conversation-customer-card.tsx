import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { EmailLine } from '@/src/features/admin/components/common/contact-lines'
import type { AdminConversation } from '@/src/types/api/admin-assistant'

/** Who wrote: the customer's account, or a guest the store cannot reach from here. */
export function ConversationCustomerCard({ conversation }: { conversation: AdminConversation }) {
  const { customer } = conversation
  return (
    <AdminCard title="Cliente">
      {customer ? (
        <>
          <p className="text-sm font-medium break-words">{customer.name}</p>
          <div className="mt-1.5">
            <EmailLine email={customer.email} />
          </div>
        </>
      ) : (
        <>
          <p className="text-sm font-medium">Invitado</p>
          <p className="mt-1 text-sm text-muted-foreground">Escribió sin iniciar sesión: no dejó datos de contacto.</p>
        </>
      )}
    </AdminCard>
  )
}
