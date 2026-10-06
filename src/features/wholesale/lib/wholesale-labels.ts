import type { WholesaleStatus } from '@/src/types/api/auth'
import type { ApplicantTaxCondition, WholesaleCompany } from '@/src/types/api/wholesale'

/** Short status for badges and lists. */
export const WHOLESALE_STATUS_LABEL: Record<WholesaleStatus, string> = {
  PENDING: 'En revisión',
  APPROVED: 'Aprobada',
  REJECTED: 'No aprobada',
  PAUSED: 'Pausada',
}

/** What the status means for the customer. */
export const WHOLESALE_STATUS_DESCRIPTION: Record<WholesaleStatus, string> = {
  PENDING: 'Nuestro equipo está revisando tu solicitud. Mientras tanto, seguís comprando con los precios de la tienda.',
  APPROVED: 'Tu cuenta está aprobada: al ingresar ves los precios de cliente frecuente.',
  REJECTED: 'Por ahora no pudimos aprobar tu solicitud. Podés corregir los datos y enviarla de nuevo.',
  PAUSED: 'Tu cuenta está pausada: por ahora comprás con los precios de la tienda. Consultá al local para reactivarla.',
}

export const TAX_CONDITION_LABEL: Record<WholesaleCompany['taxCondition'], string> = {
  RESPONSABLE_INSCRIPTO: 'Responsable inscripto',
  MONOTRIBUTISTA: 'Monotributista',
  EXENTO: 'Exento',
  CONSUMIDOR_FINAL: 'Consumidor final',
  NO_RESPONSABLE: 'No responsable',
}

export const APPLICANT_TAX_CONDITIONS: ApplicantTaxCondition[] = ['RESPONSABLE_INSCRIPTO', 'MONOTRIBUTISTA', 'EXENTO']
