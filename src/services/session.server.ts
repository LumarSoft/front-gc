import 'server-only'
import { ApiError } from '@/src/lib/api-client'
import { hasAccessToken, serverApiRequest } from '@/src/lib/server-api'
import type { AuthUser } from '@/src/types/api/auth'

export type ServerSession =
  | { status: 'authenticated'; user: AuthUser }
  /** The access cookie expired: the browser must refresh it (the refresh cookie never reaches this server). */
  | { status: 'expired' }
  | { status: 'anonymous' }

/** Who is visiting, read on the server from the access cookie. Used by areas that need a role before rendering. */
export async function getServerSession(): Promise<ServerSession> {
  try {
    const { data } = await serverApiRequest<AuthUser>('/auth/me')
    return { status: 'authenticated', user: data }
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return (await hasAccessToken()) ? { status: 'expired' } : { status: 'anonymous' }
    }
    throw error
  }
}
