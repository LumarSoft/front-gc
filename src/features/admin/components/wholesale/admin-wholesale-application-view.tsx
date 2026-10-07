'use client'

import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { formatCuit } from '@/src/features/wholesale/lib/cuit'
import { TAX_CONDITION_LABEL, WHOLESALE_STATUS_LABEL } from '@/src/features/wholesale/lib/wholesale-labels'
import { formatDateTime } from '@/src/lib/format'
import type { WholesaleDecision } from '@/src/types/api/wholesale'
import { AdminPageHeader } from '../admin-page-header'
import { useAdminWholesaleApplication } from '../../hooks/use-admin-wholesale'
import { WholesaleDecisionDialog } from './wholesale-decision-dialog'

const ACTION_LABEL: Record<WholesaleDecision, string> = {
  approve: 'Aprobar',
  reject: 'Rechazar',
  pause: 'Pausar cuenta',
  resume: 'Reactivar cuenta',
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium break-words">{children}</dd>
    </div>
  )
}

export function AdminWholesaleApplicationView({ id }: { id: number }) {
  const { query, mutation, pendingDecision, request, closeDialog, decide } = useAdminWholesaleApplication(id)
  if (query.isPending) return <p role="status">Cargando solicitud…</p>
  if (query.isError)
    return (
      <div role="alert">
        <p>No pudimos cargar esta solicitud.</p>
        <Button className="mt-3" onClick={() => void query.refetch()}>
          Reintentar
        </Button>
      </div>
    )
  const application = query.data
  const { company } = application
  return (
    <div className="space-y-6">
      <Button variant="outline" asChild>
        <Link href="/admin/clientes-frecuentes">← Volver a clientes frecuentes</Link>
      </Button>
      <AdminPageHeader
        title={company.legalName}
        description={`Solicitud del ${formatDateTime(application.createdAt)}`}
      />
      <section className="space-y-4 rounded-2xl border bg-card p-5">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-bold">Estado de la cuenta</h2>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
            {WHOLESALE_STATUS_LABEL[company.wholesaleStatus]}
          </span>
        </div>
        {application.reviewNote && (
          <p className="text-sm">
            <span className="text-muted-foreground">Motivo informado al cliente: </span>
            {application.reviewNote}
          </p>
        )}
        {application.reviewedBy && application.reviewedAt && (
          <p className="text-xs text-muted-foreground">
            Última decisión de {application.reviewedBy.name} el {formatDateTime(application.reviewedAt)}
          </p>
        )}
        {application.allowedDecisions.length ? (
          <div className="flex flex-wrap gap-3">
            {application.allowedDecisions.map(decision => (
              <Button
                key={decision}
                variant={decision === 'approve' || decision === 'resume' ? 'default' : 'outline'}
                disabled={mutation.isPending}
                onClick={() => request(decision)}
              >
                {ACTION_LABEL[decision]}
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {application.latest
              ? 'Esperando que el cliente corrija sus datos y envíe una nueva solicitud.'
              : 'Esta solicitud fue reemplazada por una más nueva de la misma empresa.'}
          </p>
        )}
      </section>
      <section className="rounded-2xl border bg-card p-5">
        <h2 className="font-bold">Datos de la empresa</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <Detail label="Razón social">{company.legalName}</Detail>
          <Detail label="Nombre de fantasía">{company.tradeName ?? '—'}</Detail>
          <Detail label="CUIT">{formatCuit(company.cuit)}</Detail>
          <Detail label="Condición frente al IVA">{TAX_CONDITION_LABEL[company.taxCondition]}</Detail>
          <Detail label="Email de compras">{company.email}</Detail>
          <Detail label="Teléfono">{company.phone ?? '—'}</Detail>
          <Detail label="Solicitó">
            {application.submittedBy.name} · {application.submittedBy.email}
          </Detail>
        </dl>
        {application.message && (
          <div className="mt-5 border-t pt-4">
            <p className="text-sm text-muted-foreground">Mensaje del cliente</p>
            <p className="mt-1 whitespace-pre-line">{application.message}</p>
          </div>
        )}
        <p className="mt-5 border-t pt-4 text-xs text-muted-foreground">
          Verificá el CUIT y la condición frente al IVA en AFIP antes de aprobar. La solicitud todavía no incluye
          documentación adjunta.
        </p>
      </section>
      <WholesaleDecisionDialog
        key={pendingDecision ?? 'closed'}
        decision={pendingDecision}
        companyName={company.legalName}
        pending={mutation.isPending}
        onClose={closeDialog}
        onConfirm={decide}
      />
    </div>
  )
}
