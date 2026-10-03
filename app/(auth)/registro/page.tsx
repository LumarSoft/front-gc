import type { Metadata } from 'next'
import { RegisterForm } from '@/src/features/auth/components/register-form'
import { getSafeRedirect } from '@/src/features/auth/lib/safe-redirect'

export const metadata: Metadata = { title: 'Creá tu cuenta' }

export default async function RegisterPage({ searchParams }: PageProps<'/registro'>) {
  const { redirect } = await searchParams
  return (
    <RegisterForm redirectTo={getSafeRedirect(typeof redirect === 'string' ? redirect : undefined, '/mi-cuenta')} />
  )
}
