import 'server-only'
import { cookies } from 'next/headers'
import { ApiError } from '@/src/lib/api-client'

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001').replace(/\/+$/, '')
/** Same name as the API's access cookie (api-gc/src/common/constants/auth-cookies.ts). */
const ACCESS_TOKEN_COOKIE = 'cg_at'

export type ServerApiResult<T> = {
  data: T
  /**
   * The visitor had a session that expired: the data was loaded as anonymous. Render <SessionRefresh /> so the
   * browser renews the session and the page reloads with the buyer's own prices.
   */
  sessionExpired: boolean
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const body: unknown = await response.json()
    if (body && typeof body === 'object' && 'message' in body && typeof body.message === 'string') return body.message
  } catch {
    // Not JSON: use the status text below.
  }
  return response.statusText
}

/**
 * Server Component fetch to the API, forwarding the visitor's session so prices match their buyer profile.
 * Responses depend on the session, so they are never cached across visitors.
 */
export async function serverApiRequest<T>(path: string): Promise<ServerApiResult<T>> {
  const accessToken = (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value

  const send = (withSession: boolean): Promise<Response> =>
    fetch(`${API_URL}${path}`, {
      cache: 'no-store',
      headers: withSession && accessToken ? { Cookie: `${ACCESS_TOKEN_COOKIE}=${accessToken}` } : undefined,
    })

  let response: Response
  let sessionExpired = false
  try {
    response = await send(true)
    if (response.status === 401 && accessToken) {
      sessionExpired = true
      response = await send(false)
    }
  } catch {
    throw new ApiError(0, 'Network error')
  }

  if (!response.ok) throw new ApiError(response.status, await readErrorMessage(response))
  return { data: (await response.json()) as T, sessionExpired }
}
