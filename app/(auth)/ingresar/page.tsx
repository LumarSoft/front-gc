import type { Metadata } from 'next'
import { LoginForm } from '@/src/features/auth/components/login-form'
import { getSafeRedirect } from '@/src/features/auth/lib/safe-redirect'

export const metadata: Metadata = { title: 'Ingresá' }

export default async function LoginPage({ searchParams }: PageProps<'/ingresar'>) {
  const { redirect } = await searchParams
  return <LoginForm redirectTo={getSafeRedirect(typeof redirect === 'string' ? redirect : undefined)} />
}
