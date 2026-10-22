import { notFound } from 'next/navigation'
import { isDeveloper } from '@/src/features/auth/lib/roles'
import { getServerSession } from '@/src/services/session.server'

/**
 * Wraps the layout of a developer-only section (agreed 2026-10-22): the store's staff get a 404, and the API refuses
 * them too. The admin layout already handled a missing or expired session.
 */
export async function DeveloperOnly({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  if (session.status === 'authenticated' && !isDeveloper(session.user.role)) notFound()
  return children
}
