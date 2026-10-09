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

/** Sends the request; on a 401 it refreshes the session once and sends it again. */
async function send(path: string, init: RequestInit, skipRefresh: boolean): Promise<Response> {
  const request = (): Promise<Response> => fetch(`${API_URL}${path}`, { ...init, credentials: 'include' })
  try {
    const response = await request()
    if (response.status !== 401 || skipRefresh) return response
    // Retry even if this refresh lost a race with another tab: that tab already stored the new session cookies.
    await refreshSession()
    return await request()
  } catch {
    throw new ApiError(0, 'Network error')
  }
}

/**
 * Browser-side fetch to the API. Session cookies travel automatically (`credentials: 'include'`).
 * On a 401 it tries to refresh the session once and retries the request.
 */
export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { method = 'GET', body, skipRefresh = false, keepalive } = options
  const response = await send(
    path,
    {
      method,
      keepalive,
      // FormData (file uploads) sets its own multipart Content-Type with the boundary.
      headers: body === undefined || body instanceof FormData ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body),
    },
    skipRefresh,
  )
  if (!response.ok) throw new ApiError(response.status, await readErrorMessage(response))
  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}

/** Browser-side GET of a file (PDF, labels…) with the same session handling as `apiRequest`. */
export async function apiDownload(path: string): Promise<Blob> {
  const response = await send(path, { method: 'GET' }, false)
  if (!response.ok) throw new ApiError(response.status, await readErrorMessage(response))
  return response.blob()
}
