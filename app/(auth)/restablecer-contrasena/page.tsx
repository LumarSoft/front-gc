import type { Metadata } from 'next'
import { ResetPasswordForm } from '@/src/features/auth/components/reset-password-form'

export const metadata: Metadata = { title: 'Nueva contraseña' }

export default async function ResetPasswordPage({ searchParams }: PageProps<'/restablecer-contrasena'>) {
  const { token } = await searchParams
  return <ResetPasswordForm token={typeof token === 'string' ? token : undefined} />
}
