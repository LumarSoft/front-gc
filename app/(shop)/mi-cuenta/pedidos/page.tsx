import type { Metadata } from 'next'
import { AccountOrdersView } from '@/src/features/account/components/account-orders-view'

export const metadata: Metadata = { title: 'Mis pedidos', robots: { index: false, follow: false } }

type Props = { searchParams: Promise<{ pagina?: string | string[] }> }

export default async function AccountOrdersPage({ searchParams }: Props) {
  const { pagina } = await searchParams
  const page = Number(typeof pagina === 'string' ? pagina : 1)
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-16">
      <AccountOrdersView page={Number.isInteger(page) && page >= 1 && page <= 10_000 ? page : 1} />
    </div>
  )
}
