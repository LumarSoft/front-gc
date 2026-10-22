import Link from 'next/link'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { SystemFact, SystemFacts } from '@/src/features/admin/components/system/system-fact'
import { formatFromNow } from '@/src/features/admin/lib/relative-date'
import type { SystemStatus } from '@/src/types/api/admin-system'

/** How many errors and warnings the API kept in the last day, the last error, and the way to all of them. */
export function SystemLogsCard({ logs }: { logs: SystemStatus['logs'] }) {
  return (
    <AdminCard
      title="Errores (últimas 24 h)"
      aside={
        <Link href="/admin/sistema/errores" className="text-xs font-medium text-primary hover:underline">
          Ver todos
        </Link>
      }
    >
      <SystemFacts>
        <SystemFact label="Errores">{logs.last24h.errors}</SystemFact>
        <SystemFact label="Avisos">{logs.last24h.warnings}</SystemFact>
        <SystemFact label="Último error">
          {logs.lastError ? (
            <>
              {formatFromNow(logs.lastError.at)} · {logs.lastError.source}
              <span className="block text-xs font-normal break-words text-muted-foreground">
                {logs.lastError.message}
              </span>
            </>
          ) : (
            'Ninguno en 30 días'
          )}
        </SystemFact>
      </SystemFacts>
      <Link
        href="/admin/sistema/actividad"
        className="mt-3 inline-block text-xs font-medium text-primary hover:underline"
      >
        Ver la actividad del panel
      </Link>
    </AdminCard>
  )
}
