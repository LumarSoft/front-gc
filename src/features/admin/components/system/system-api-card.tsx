import { SystemFact, SystemFacts } from '@/src/features/admin/components/system/system-fact'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import { formatBytes, formatUptime, percent } from '@/src/features/admin/lib/system-display'
import type { FrontVersion, SystemStatus } from '@/src/types/api/admin-system'

type SystemApiCardProps = { status: SystemStatus; front: FrontVersion }

/** Which code is running in the API and the store, and how the server is doing. */
export function SystemApiCard({ status, front }: SystemApiCardProps) {
  const { api, environment } = status
  const { machine, disk } = api
  return (
    <AdminCard title="Versiones y servidor">
      <SystemFacts>
        <SystemFact label="API">
          {api.version ? (
            <>
              <code className="font-mono">{api.version.commit}</code> · {formatOrderDate(api.version.committedAt)}
              <span className="block truncate text-xs font-normal text-muted-foreground">{api.version.subject}</span>
            </>
          ) : (
            'Sin datos de git'
          )}
        </SystemFact>
        <SystemFact label="Tienda (Vercel)">
          {front ? (
            <>
              <code className="font-mono">{front.commit.slice(0, 7)}</code>
              {front.environment && ` · ${front.environment}`}
              {front.subject && (
                <span className="block truncate text-xs font-normal text-muted-foreground">{front.subject}</span>
              )}
            </>
          ) : (
            'Local, fuera de Vercel'
          )}
        </SystemFact>
        <SystemFact label="Entorno de la API">{environment}</SystemFact>
        <SystemFact label="Encendida hace">
          {formatUptime(api.uptimeSeconds)}
          <span className="block text-xs font-normal text-muted-foreground">
            desde {formatOrderDate(api.startedAt)}
          </span>
        </SystemFact>
        <SystemFact label="Node">{api.node}</SystemFact>
        <SystemFact label="Memoria">
          API {formatBytes(machine.processBytes)} · servidor{' '}
          {formatBytes(machine.systemTotalBytes - machine.systemFreeBytes)} de {formatBytes(machine.systemTotalBytes)}
        </SystemFact>
        <SystemFact label="Carga">
          {machine.load.join(' · ')}{' '}
          <span className="font-normal text-muted-foreground">
            ({machine.cpus} {machine.cpus === 1 ? 'núcleo' : 'núcleos'})
          </span>
        </SystemFact>
        <SystemFact label="Disco libre">
          {disk
            ? `${formatBytes(disk.freeBytes)} de ${formatBytes(disk.totalBytes)} (${percent(disk.freeBytes, disk.totalBytes)} %)`
            : 'Sin datos'}
        </SystemFact>
      </SystemFacts>
    </AdminCard>
  )
}
