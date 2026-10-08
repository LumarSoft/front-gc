import { Button } from '@/src/components/ui/button'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { WHOLESALE_DECISION_LABEL } from '@/src/features/admin/lib/wholesale-display'
import type { WholesaleStatus } from '@/src/types/api/auth'
import type { AdminWholesaleApplication, WholesaleDecision } from '@/src/types/api/wholesale'

const STATE_COPY: Record<WholesaleStatus, string> = {
  PENDING:
    'Revisá los datos de la empresa y verificá el CUIT y la condición frente al IVA en AFIP antes de aprobar. Todavía no se piden documentos.',
  APPROVED: 'La empresa compra con los precios de cliente frecuente.',
  PAUSED: 'La empresa compra con los precios de la tienda hasta que reactives la cuenta.',
  REJECTED: 'El cliente puede corregir sus datos y enviar una nueva solicitud.',
}

/** Approve and resume move the account forward; the rest are secondary. */
const PRIMARY: WholesaleDecision[] = ['approve', 'resume']

type ApplicationReviewCardProps = {
  application: AdminWholesaleApplication
  pending: boolean
  onDecide: (decision: WholesaleDecision) => void
}

/** What the current state means for the company and the decisions it accepts now. */
export function ApplicationReviewCard({ application, pending, onDecide }: ApplicationReviewCardProps) {
  const decisions = [...application.allowedDecisions].sort(
    (a, b) => Number(PRIMARY.includes(a)) - Number(PRIMARY.includes(b)),
  )
  return (
    <AdminCard
      title="Revisión"
      footer={
        decisions.length > 0 &&
        decisions.map(decision => (
          <Button
            key={decision}
            variant={PRIMARY.includes(decision) ? 'default' : 'outline'}
            disabled={pending}
            onClick={() => onDecide(decision)}
          >
            {WHOLESALE_DECISION_LABEL[decision]}
          </Button>
        ))
      }
    >
      <p className="text-sm">
        {application.latest
          ? STATE_COPY[application.status]
          : 'Esta solicitud fue reemplazada por una más nueva de la misma empresa. Las decisiones se toman sobre la última.'}
      </p>
      {application.reviewNote && (
        <div className="mt-3 rounded-lg bg-muted px-3 py-2 text-sm">
          <p className="text-xs text-muted-foreground">
            {application.status === 'REJECTED' || application.status === 'PAUSED'
              ? 'Motivo informado al cliente'
              : 'Nota para el cliente'}
          </p>
          <p className="mt-0.5 break-words">{application.reviewNote}</p>
        </div>
      )}
    </AdminCard>
  )
}
