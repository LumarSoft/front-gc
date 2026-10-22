import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { ToneBadge } from '@/src/features/admin/components/common/tone-badge'
import { SystemFact, SystemFacts } from '@/src/features/admin/components/system/system-fact'
import type { SystemStatus } from '@/src/types/api/admin-system'

/** Whether the database answers quickly and has every migration the API expects. */
export function SystemDatabaseCard({ database }: { database: SystemStatus['database'] }) {
  const { migrations } = database
  return (
    <AdminCard title="Base de datos" aside={<ToneBadge tone="success">Conectada</ToneBadge>}>
      <SystemFacts>
        <SystemFact label="Respuesta">{database.latencyMs} ms</SystemFact>
        <SystemFact label="Migraciones">
          {!migrations
            ? 'Sin carpeta para comparar'
            : migrations.pending.length
              ? `Faltan ${migrations.pending.length}: ${migrations.pending.join(', ')}`
              : `Al día (${migrations.total})`}
        </SystemFact>
      </SystemFacts>
    </AdminCard>
  )
}
