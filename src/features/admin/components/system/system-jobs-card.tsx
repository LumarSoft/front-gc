import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { ToneBadge } from '@/src/features/admin/components/common/tone-badge'
import { SystemFact, SystemFacts } from '@/src/features/admin/components/system/system-fact'
import { formatFromNow } from '@/src/features/admin/lib/relative-date'
import type { SystemStatus } from '@/src/types/api/admin-system'

/** The tasks the API runs on its own. Today only the expiry of unpaid reservations, every minute. */
export function SystemJobsCard({ jobs }: { jobs: SystemStatus['jobs'] }) {
  const expiry = jobs.orderExpiry
  const healthy = !expiry.failed && expiry.overdue === 0 && expiry.lastRunAt !== null
  return (
    <AdminCard title="Tareas automáticas">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold">Vencimiento de reservas</h3>
          <ToneBadge tone={healthy ? 'success' : 'critical'}>{healthy ? 'Funciona' : 'Con problemas'}</ToneBadge>
        </div>
        <p className="text-xs text-muted-foreground">
          Cada minuto libera el stock de los pedidos que no se pagaron a tiempo.
        </p>
        <SystemFacts>
          <SystemFact label="Última corrida">{expiry.lastRunAt ? formatFromNow(expiry.lastRunAt) : 'Nunca'}</SystemFact>
          <SystemFact label="Pedidos liberados (24 h)">{expiry.expiredLast24h}</SystemFact>
          <SystemFact label="Vencidos sin liberar">{expiry.overdue}</SystemFact>
        </SystemFacts>
      </div>
    </AdminCard>
  )
}
