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
