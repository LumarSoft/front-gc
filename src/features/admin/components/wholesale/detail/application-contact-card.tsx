import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { EmailLine, PhoneLine } from '@/src/features/admin/components/common/contact-lines'
import type { AdminWholesaleApplication } from '@/src/types/api/wholesale'

/** How to reach the company, and the account that applied (the one that gets the prices). */
export function ApplicationContactCard({ application }: { application: AdminWholesaleApplication }) {
  const { company, submittedBy } = application
  return (
    <AdminCard title="Contacto">
      <p className="text-xs text-muted-foreground">Compras</p>
      <div className="mt-1.5 flex flex-col gap-2">
        <EmailLine email={company.email} />
        <PhoneLine phone={company.phone} />
      </div>
      <div className="mt-4 border-t pt-4">
        <p className="text-xs text-muted-foreground">Cuenta que solicitó</p>
        <p className="mt-1 text-sm font-medium break-words">{submittedBy.name}</p>
        <div className="mt-1.5">
          <EmailLine email={submittedBy.email} />
        </div>
      </div>
    </AdminCard>
  )
}
