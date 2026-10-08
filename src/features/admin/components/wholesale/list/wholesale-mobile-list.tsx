import Link from 'next/link'
import { WholesaleStatusBadges } from '@/src/features/admin/components/wholesale/wholesale-status-badge'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import { formatCuit } from '@/src/features/wholesale/lib/cuit'
import type { AdminWholesaleApplication } from '@/src/types/api/wholesale'

/** Phone list (below md): company and CUIT, who applied and when, then the status. */
export function WholesaleMobileList({ applications }: { applications: AdminWholesaleApplication[] }) {
  return (
    <ul className="divide-y md:hidden">
      {applications.map(application => (
        <li key={application.id}>
          <Link
            href={`/admin/clientes-frecuentes/${application.id}`}
            className="flex flex-col gap-1.5 px-4 py-3 transition-colors active:bg-table-head"
          >
            <p className="truncate text-sm font-semibold">{application.company.legalName}</p>
            <p className="truncate text-sm text-muted-foreground">
              CUIT {formatCuit(application.company.cuit)} · {application.submittedBy.name}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <WholesaleStatusBadges application={application} />
              <span className="ml-auto text-xs text-muted-foreground">{formatOrderDate(application.createdAt)}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
