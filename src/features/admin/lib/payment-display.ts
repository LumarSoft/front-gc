import type { BadgeTone } from '@/src/features/admin/components/common/tone-badge'
import type { PaymentStatus } from '@/src/types/api/orders'

export const PAYMENT_STATUS_BADGES: Record<PaymentStatus, { label: string; tone: BadgeTone }> = {
  PENDING: { label: 'Pendiente', tone: 'attention' },
  IN_REVIEW: { label: 'En revisión', tone: 'attention' },
  APPROVED: { label: 'Aprobado', tone: 'success' },
  REJECTED: { label: 'Rechazado', tone: 'critical' },
  CANCELLED: { label: 'Cancelado', tone: 'neutral' },
  REFUNDED: { label: 'Devuelto', tone: 'neutral' },
}
