import type { Metadata } from 'next'
import { AccountOrderView } from '@/src/features/account/components/account-order-view'

export const metadata: Metadata = { title: 'Detalle del pedido', robots: { index: false, follow: false } }

export default async function AccountOrderPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
      <AccountOrderView number={number} />
    </div>
  )
}
