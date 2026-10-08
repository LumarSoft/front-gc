import {
  IndexTable,
  IndexTableBody,
  IndexTableCell,
  IndexTableHead,
  IndexTableHeader,
  IndexTableRow,
  IndexTableRowLink,
} from '@/src/features/admin/components/common/index-table'
import { WholesaleStatusBadges } from '@/src/features/admin/components/wholesale/wholesale-status-badge'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import { formatCuit } from '@/src/features/wholesale/lib/cuit'
import { TAX_CONDITION_LABEL } from '@/src/features/wholesale/lib/wholesale-labels'
import type { AdminWholesaleApplication } from '@/src/types/api/wholesale'

/** Desktop list (md and up): one dense row per application; any cell opens it. */
export function WholesaleTable({ applications }: { applications: AdminWholesaleApplication[] }) {
  return (
    <IndexTable className="hidden md:table">
      <IndexTableHeader>
        <IndexTableHead className="w-full">Empresa</IndexTableHead>
        <IndexTableHead>CUIT</IndexTableHead>
        <IndexTableHead>Condición IVA</IndexTableHead>
        <IndexTableHead>Solicitó</IndexTableHead>
        <IndexTableHead>Fecha</IndexTableHead>
        <IndexTableHead>Estado</IndexTableHead>
      </IndexTableHeader>
      <IndexTableBody>
        {applications.map(application => {
          const { company } = application
          return (
            <IndexTableRow key={application.id}>
              <IndexTableCell className="max-w-0 min-w-48">
                <IndexTableRowLink
                  href={`/admin/clientes-frecuentes/${application.id}`}
                  className="block truncate font-semibold"
                >
                  {company.legalName}
                </IndexTableRowLink>
                {company.tradeName && (
                  <span className="block truncate text-xs text-muted-foreground">{company.tradeName}</span>
                )}
              </IndexTableCell>
              <IndexTableCell className="tabular-nums">{formatCuit(company.cuit)}</IndexTableCell>
              <IndexTableCell className="text-muted-foreground">
                {TAX_CONDITION_LABEL[company.taxCondition]}
              </IndexTableCell>
              <IndexTableCell className="max-w-48">
                <span className="block truncate">{application.submittedBy.name}</span>
              </IndexTableCell>
              <IndexTableCell className="text-muted-foreground">
                {formatOrderDate(application.createdAt)}
              </IndexTableCell>
              <IndexTableCell>
                <div className="flex gap-1.5">
                  <WholesaleStatusBadges application={application} />
                </div>
              </IndexTableCell>
            </IndexTableRow>
          )
        })}
      </IndexTableBody>
    </IndexTable>
  )
}
