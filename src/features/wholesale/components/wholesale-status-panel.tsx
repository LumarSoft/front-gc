import type { WholesaleApplication } from '@/src/types/api/wholesale'
import { formatDateTime } from '@/src/lib/format'
import { formatCuit } from '../lib/cuit'
import { WHOLESALE_STATUS_DESCRIPTION, WHOLESALE_STATUS_LABEL } from '../lib/wholesale-labels'

type Props = {
  application: WholesaleApplication
  children?: React.ReactNode
}

/** Where the customer's account stands: status, the team's reason when there is one, and the company sent. */
export function WholesaleStatusPanel({ application, children }: Props) {
  const status = application.company.wholesaleStatus
  return (
    <section className="rounded-2xl bg-surface p-5 sm:p-6" aria-label="Estado de tu cuenta de cliente frecuente">
      <p className="text-sm font-semibold text-primary">Estado de tu cuenta</p>
      <h2 className="mt-2 text-2xl font-extrabold">{WHOLESALE_STATUS_LABEL[status]}</h2>
      <p className="mt-3 text-sm text-muted-foreground">{WHOLESALE_STATUS_DESCRIPTION[status]}</p>
      {application.reviewNote && (status === 'REJECTED' || status === 'PAUSED') && (
        <p className="mt-4 rounded-xl border bg-background p-4 text-sm">
          <span className="font-semibold">Motivo: </span>
          {application.reviewNote}
        </p>
      )}
      <dl className="mt-5 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Empresa</dt>
          <dd className="font-medium">{application.company.legalName}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">CUIT</dt>
          <dd className="font-medium">{formatCuit(application.company.cuit)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Enviada</dt>
          <dd>{formatDateTime(application.createdAt)}</dd>
        </div>
      </dl>
      {children}
    </section>
  )
}
