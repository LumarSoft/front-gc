'use client'

import { useQuery } from '@tanstack/react-query'
import { exchangeRatesQuery, priceListsQuery } from '@/src/features/admin/lib/admin-queries'

export function usePriceLists() {
  return useQuery(priceListsQuery)
}

export function useExchangeRates() {
  return useQuery(exchangeRatesQuery)
}
