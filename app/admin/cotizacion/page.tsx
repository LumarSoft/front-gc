import type { Metadata } from 'next'
import { ExchangeRateView } from '@/src/features/admin/components/pricing/exchange-rate-view'

export const metadata: Metadata = { title: 'Cotización del dólar' }

export default function AdminExchangeRatePage() {
  return <ExchangeRateView />
}
