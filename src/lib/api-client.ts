/** Error thrown for every non-2xx API response. `status` 0 means the API could not be reached. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

type ApiRequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  /** JSON-serializable data, or FormData for file uploads. */
  body?: unknown
  /** Skip the automatic session refresh (used by the auth endpoints themselves). */
  skipRefresh?: boolean
  /** Let the request finish even if the page navigates away (fire-and-forget reports). */
  keepalive?: boolean
}

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001').replace(/\/+$/, '')

let refreshInFlight: Promise<boolean> | null = null

/** One refresh at a time: concurrent 401s wait for the same request instead of rotating the token twice. */
export function refreshSession(): Promise<boolean> {
  refreshInFlight ??= fetch(`${API_URL}/auth/refresh`, { method: 'POST', credentials: 'include' })
    .then(response => response.ok)
    .catch(() => false)
    .finally(() => {
      refreshInFlight = null
    })
  return refreshInFlight
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const data: unknown = await response.json()
    if (data && typeof data === 'object' && 'message' in data) {
      const { message } = data as { message: unknown }
      if (typeof message === 'string') return message
      if (Array.isArray(message)) return message.join(', ')
    }
  } catch {
    // Body is not JSON: fall back to the status text below.
  }
  return response.statusText
}

/**
 * Browser-side fetch to the API. Session cookies travel automatically (`credentials: 'include'`).
 * On a 401 it tries to refresh the session once and retries the request.
 */
export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { method = 'GET', body, skipRefresh = false, keepalive } = options

  const send = (): Promise<Response> =>
    fetch(`${API_URL}${path}`, {
      method,
      credentials: 'include',
      keepalive,
      // FormData (file uploads) sets its own multipart Content-Type with the boundary.
      headers: body === undefined || body instanceof FormData ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body),
    })

  let response: Response
  try {
    response = await send()
    if (response.status === 401 && !skipRefresh) {
      // Retry even if this refresh lost a race with another tab: that tab already stored the new session cookies.
      await refreshSession()
      response = await send()
    }
  } catch {
    throw new ApiError(0, 'Network error')
  }

  if (!response.ok) throw new ApiError(response.status, await readErrorMessage(response))
  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}
