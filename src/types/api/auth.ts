// Matches api-gc/docs/endpoints.md → Auth.

export type UserRole = 'CUSTOMER' | 'ADMIN'
export type BuyerType = 'RETAIL' | 'WHOLESALE'
export type WholesaleStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAUSED'

export type AuthCompany = {
  id: number
  legalName: string
  wholesaleStatus: WholesaleStatus
}

export type AuthUser = {
  id: number
  email: string
  firstName: string
  lastName: string
  phone: string | null
  role: UserRole
  buyerType: BuyerType
  emailVerified: boolean
  company: AuthCompany | null
}

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  marketingOptIn?: boolean
}

export type ResetPasswordRequest = {
  token: string
  password: string
}
