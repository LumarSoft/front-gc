import type { Metadata } from 'next'
import { AccountOverview } from '@/src/features/account/components/account-overview'

export const metadata: Metadata = { title: 'Mi cuenta', robots: { index: false, follow: false } }

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-16">
      <AccountOverview />
    </div>
  )
}
