import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { formatCuit } from '@/src/features/wholesale/lib/cuit'
import { TAX_CONDITION_LABEL } from '@/src/features/wholesale/lib/wholesale-labels'
import type { AdminWholesaleApplication } from '@/src/types/api/wholesale'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm break-words">{children}</dd>
    </div>
  )
}

/** Fiscal data to verify in AFIP, and what the customer wrote when applying. */
export function ApplicationCompanyCard({ application }: { application: AdminWholesaleApplication }) {
  const { company } = application
  return (
    <AdminCard title="Empresa">
      <dl className="grid gap-4 sm:grid-cols-2">
        <Field label="Razón social">{company.legalName}</Field>
        <Field label="Nombre de fantasía">{company.tradeName ?? '—'}</Field>
        <Field label="CUIT">
          <span className="tabular-nums">{formatCuit(company.cuit)}</span>
        </Field>
        <Field label="Condición frente al IVA">{TAX_CONDITION_LABEL[company.taxCondition]}</Field>
      </dl>
      {application.message && (
        <div className="mt-4 border-t pt-4">
          <p className="text-xs text-muted-foreground">Mensaje del cliente</p>
          <p className="mt-1 text-sm whitespace-pre-line break-words">{application.message}</p>
        </div>
      )}
    </AdminCard>
  )
}
