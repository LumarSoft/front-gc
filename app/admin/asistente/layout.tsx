import { notFound } from 'next/navigation'
import { isDeveloper } from '@/src/features/auth/lib/roles'
import { getServerSession } from '@/src/services/session.server'

/**
 * The assistant's conversations, missing data and metrics are for developers only (agreed 2026-10-22); the store's
 * staff get a 404. The API refuses these routes to them too. The admin layout already handled a missing session.
 */
export default async function AssistantAdminLayout({ children }: LayoutProps<'/admin/asistente'>) {
  const session = await getServerSession()
  if (session.status === 'authenticated' && !isDeveloper(session.user.role)) notFound()
  return children
}
