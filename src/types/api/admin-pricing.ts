// Matches api-gc/docs/endpoints.md → Pricing (admin).
import type { Currency, DataSource } from '@/src/types/api/admin-products'

export type PriceList = {
  id: number
  code: string
  name: string
  audience: 'RETAIL' | 'WHOLESALE'
  isDefault: boolean
}

export type ExchangeRate = {
  id: number
  currency: Currency
  /** ARS per USD, 4 decimals. */
  rate: string
  source: DataSource
  effectiveFrom: string
  createdAt: string
}

export type ExchangeRates = {
  current: ExchangeRate | null
  scheduled: ExchangeRate[]
  history: ExchangeRate[]
}

export type ExchangeRateInput = { rate: string; effectiveFrom?: string }
