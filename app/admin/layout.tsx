import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { AdminSessionRenewal } from '@/src/features/admin/components/admin-session-renewal'
import { AdminShell } from '@/src/features/admin/components/shell/admin-shell'
import { getServerSession } from '@/src/services/session.server'

export const metadata: Metadata = {
  title: { default: 'Administración', template: '%s | Administración' },
  robots: { index: false, follow: false },
}

/**
 * Only admins see the panel. This check is for the interface: every /admin endpoint of the API checks the role again.
 * Customers get a 404.
 */
export default async function AdminLayout({ children }: LayoutProps<'/admin'>) {
  const session = await getServerSession()

  if (session.status === 'anonymous') redirect('/ingresar?redirect=/admin')
  if (session.status === 'expired') return <AdminSessionRenewal />
  if (session.user.role !== 'ADMIN') notFound()

  return <AdminShell user={session.user}>{children}</AdminShell>
}
