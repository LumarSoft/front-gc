import { apiRequest } from '@/src/lib/api-client'
import type { ExchangeRateInput, ExchangeRates, PriceList } from '@/src/types/api/admin-pricing'

export function getPriceLists(): Promise<PriceList[]> {
  return apiRequest<PriceList[]>('/admin/price-lists')
}

export function getExchangeRates(limit = 20): Promise<ExchangeRates> {
  return apiRequest<ExchangeRates>(`/admin/exchange-rates?limit=${limit}`)
}

export function createExchangeRate(input: ExchangeRateInput): Promise<ExchangeRates> {
  return apiRequest<ExchangeRates>('/admin/exchange-rates', { method: 'POST', body: { currency: 'USD', ...input } })
}
