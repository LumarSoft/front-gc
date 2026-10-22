// Matches api-gc/docs/endpoints.md → "System (developers)".

export type CodeVersion = { commit: string; committedAt: string; subject: string }

export type SystemStatus = {
  checkedAt: string
  environment: string
  api: {
    version: CodeVersion | null
    startedAt: string
    uptimeSeconds: number
    node: string
    machine: { processBytes: number; systemTotalBytes: number; systemFreeBytes: number; load: number[]; cpus: number }
    disk: { path: string; totalBytes: number; freeBytes: number } | null
  }
  database: { latencyMs: number; migrations: { total: number; pending: string[] } | null }
  integrations: {
    mercadoPago: {
      configured: boolean
      /** Kind of access token: TEST- (sandbox) or APP_USR- (production, or a test user's). */
      credentials: 'TEST' | 'APP_USR' | 'OTHER' | null
      webhookSecret: boolean
      notificationUrl: string | null
      lastNotificationAt: string | null
      failedNotifications: { count: number; lastAt: string | null; lastError: string | null }
    }
    zipnova: {
      configured: boolean
      webhookSecret: boolean
      apiHost: string | null
      lastQuoteAt: string | null
      lastShipmentAt: string | null
    }
    openai: {
      configured: boolean
      model: string
      reasoningEffort: string
      tokensToday: number
      dailyTokenLimit: number
      whatsappNumber: boolean
    }
    email: { provider: null; last30Days: { failed: number; logged: number; sent: number }; lastAt: string | null }
  }
  /** Errors and warnings the API kept, of the last 24 hours (repeats included). */
  logs: {
    last24h: { errors: number; warnings: number }
    lastError: { at: string; source: string; message: string } | null
  }
  jobs: {
    orderExpiry: { lastRunAt: string | null; failed: boolean; expiredLast24h: number; overdue: number }
  }
  store: {
    exchangeRate: { rate: string; effectiveFrom: string } | null
    publishedWithoutImages: number
    publishedOutOfStock: number
    awaitingPayment: number
  }
}

/** The front's own version, as Vercel builds it (null outside Vercel). */
export type FrontVersion = { commit: string; subject: string | null; environment: string | null } | null

type Page<T> = { items: T[]; page: number; pageSize: number; total: number; totalPages: number }

export type SystemLogLevel = 'ERROR' | 'WARN'

/** An error or warning the API logged; `source` "HTTP" with its `route` for a request that failed. */
export type SystemLog = {
  id: number
  level: SystemLogLevel
  source: string
  route: string | null
  message: string
  stack: string | null
  /** Times it happened within a few seconds (stored once). */
  count: number
  createdAt: string
  lastSeenAt: string
}

export type SystemLogsPage = Page<SystemLog> & { sources: { source: string; count: number }[] }

export type SystemLogsQuery = {
  level?: SystemLogLevel
  source?: string
  q?: string
  page?: number
  pageSize: number
}

/** A change staff made in the admin. `changes` is `{ field: { from, to } }` when the action changed fields. */
export type SystemActivity = {
  id: number
  action: string
  entityType: string
  entityId: number | null
  changes: Record<string, { from?: unknown; to?: unknown }> | null
  ipAddress: string | null
  createdAt: string
  user: { id: number; name: string; email: string } | null
}

export type SystemActivityPage = Page<SystemActivity> & { users: { id: number; name: string }[]; entityTypes: string[] }

export type SystemActivityQuery = { userId?: number; entityType?: string; page?: number; pageSize: number }
