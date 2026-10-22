'use client'

import { Card } from '@/src/components/ui/card'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { DetailSkeleton } from '@/src/features/admin/components/common/detail-skeleton'
import { QueryErrorState } from '@/src/features/admin/components/feedback/query-error-state'
import { SystemApiCard } from '@/src/features/admin/components/system/system-api-card'
import { SystemChecksCard } from '@/src/features/admin/components/system/system-checks-card'
import { SystemDatabaseCard } from '@/src/features/admin/components/system/system-database-card'
import { SystemIntegrationsCard } from '@/src/features/admin/components/system/system-integrations-card'
import { SystemJobsCard } from '@/src/features/admin/components/system/system-jobs-card'
import { SystemLogsCard } from '@/src/features/admin/components/system/system-logs-card'
import { SystemStoreCard } from '@/src/features/admin/components/system/system-store-card'
import { useSystemStatus } from '@/src/features/admin/hooks/use-system-status'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import { systemChecks } from '@/src/features/admin/lib/system-checks'
import type { FrontVersion } from '@/src/types/api/admin-system'

/**
 * "Sistema" (developers only): what to review first, then the versions and the server, the database, each
 * integration, the scheduled tasks and the store's data. Read again every 30 seconds.
 */
export function SystemView({ front }: { front: FrontVersion }) {
  const query = useSystemStatus()

  return (
    <div className="mx-auto flex max-w-6xl flex-col">
      <AdminPageHeader
        title="Sistema"
        description="Cómo están la API, la base, las integraciones y las tareas automáticas. Se actualiza solo cada 30 segundos."
      />
      {query.isPending ? (
        <DetailSkeleton label="Leyendo el estado del sistema" />
      ) : query.isError ? (
        <Card className="py-0">
          <QueryErrorState
            message="No pudimos leer el estado del sistema. Si la API está caída, esta página tampoco puede cargarlo."
            onRetry={() => void query.refetch()}
          />
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          <SystemChecksCard checks={systemChecks(query.data, new Date(query.data.checkedAt))} />
          <div className="grid items-start gap-4 lg:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-4">
              <SystemLogsCard logs={query.data.logs} />
              <SystemApiCard status={query.data} front={front} />
              <SystemDatabaseCard database={query.data.database} />
              <SystemJobsCard jobs={query.data.jobs} />
            </div>
            <div className="flex min-w-0 flex-col gap-4">
              <SystemIntegrationsCard integrations={query.data.integrations} />
              <SystemStoreCard store={query.data.store} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Leído {formatOrderDate(query.data.checkedAt).toLowerCase()}.</p>
        </div>
      )}
    </div>
  )
}
