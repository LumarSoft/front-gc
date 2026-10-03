import type { Metadata } from 'next'
import { VerifyEmailStatus } from '@/src/features/auth/components/verify-email-status'

export const metadata: Metadata = { title: 'Confirmá tu email' }

export default async function VerifyEmailPage({ searchParams }: PageProps<'/verificar-email'>) {
  const { token } = await searchParams
  return <VerifyEmailStatus token={typeof token === 'string' ? token : undefined} />
}
