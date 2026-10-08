import type { BadgeTone } from '@/src/features/admin/components/common/tone-badge'
import type { WholesaleStatus } from '@/src/types/api/auth'
import type { WholesaleDecision } from '@/src/types/api/wholesale'

/** Staff wording of each status (the store tells the customer "En revisión" / "No aprobada"). */
export const WHOLESALE_STATUS_BADGE: Record<WholesaleStatus, { label: string; tone: BadgeTone }> = {
  PENDING: { label: 'Pendiente', tone: 'attention' },
  APPROVED: { label: 'Aprobada', tone: 'success' },
  PAUSED: { label: 'Pausada', tone: 'warning' },
  REJECTED: { label: 'Rechazada', tone: 'neutral' },
}

export const WHOLESALE_STATUS_VIEWS: { value: WholesaleStatus | undefined; label: string }[] = [
  { value: undefined, label: 'Todas' },
  { value: 'PENDING', label: 'Pendientes' },
  { value: 'APPROVED', label: 'Aprobadas' },
  { value: 'PAUSED', label: 'Pausadas' },
  { value: 'REJECTED', label: 'Rechazadas' },
]

/** History line for the latest staff decision, by the status it left. */
export const WHOLESALE_DECISION_EVENT: Record<Exclude<WholesaleStatus, 'PENDING'>, string> = {
  APPROVED: 'Cuenta aprobada',
  PAUSED: 'Cuenta pausada',
  REJECTED: 'Solicitud rechazada',
}

export const WHOLESALE_DECISION_LABEL: Record<WholesaleDecision, string> = {
  approve: 'Aprobar',
  reject: 'Rechazar',
  pause: 'Pausar cuenta',
  resume: 'Reactivar cuenta',
}

/** Decisions that must tell the customer why. */
export const DECISIONS_WITH_REASON: WholesaleDecision[] = ['reject', 'pause']
