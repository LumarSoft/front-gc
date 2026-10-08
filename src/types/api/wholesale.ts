// Matches api-gc/docs/endpoints.md → Frequent-customer applications. "Clientes frecuentes" in the UI.
import type { WholesaleStatus } from './auth'

export type ApplicantTaxCondition = 'RESPONSABLE_INSCRIPTO' | 'MONOTRIBUTISTA' | 'EXENTO'
export type WholesaleDecision = 'approve' | 'reject' | 'pause' | 'resume'

export type WholesaleCompany = {
  id: number
  legalName: string
  tradeName: string | null
  cuit: string
  taxCondition: ApplicantTaxCondition | 'CONSUMIDOR_FINAL' | 'NO_RESPONSABLE'
  email: string
  phone: string | null
  wholesaleStatus: WholesaleStatus
}

export type WholesaleApplication = {
  id: number
  status: WholesaleStatus
  message: string | null
  /** Reason given by the team (rejection or pause), visible to the customer. */
  reviewNote: string | null
  createdAt: string
  reviewedAt: string | null
  company: WholesaleCompany
}

export type MyWholesaleApplication = {
  application: WholesaleApplication | null
  canApply: boolean
  blockReason: string | null
}

export type CreateWholesaleApplicationRequest = {
  legalName: string
  tradeName?: string
  cuit: string
  taxCondition: ApplicantTaxCondition
  email: string
  phone?: string
  message?: string
}

export type AdminWholesaleApplication = WholesaleApplication & {
  submittedBy: { id: number; name: string; email: string }
  reviewedBy: { id: number; name: string } | null
  /** False when the company sent a newer application; only the latest accepts decisions. */
  latest: boolean
  allowedDecisions: WholesaleDecision[]
}

/** GET /admin/wholesale-applications query; `q` matches names, CUIT and emails. */
export type AdminWholesaleQuery = {
  status?: WholesaleStatus
  q?: string
  page?: number
  pageSize: number
}

/** Applications in each status (superseded ones included), for the list views and the nav badge. */
export type WholesaleApplicationCounts = Record<WholesaleStatus, number>

export type WholesaleApplicationsPage = {
  items: AdminWholesaleApplication[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}
