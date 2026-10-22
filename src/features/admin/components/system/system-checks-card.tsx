import { CircleAlertIcon, CircleCheckIcon, TriangleAlertIcon } from 'lucide-react'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import type { SystemCheck } from '@/src/features/admin/lib/system-checks'
import { cn } from '@/src/lib/utils'

/** What needs a look, most serious first; a single line when everything is in order. */
export function SystemChecksCard({ checks }: { checks: SystemCheck[] }) {
  if (checks.length === 0)
    return (
      <AdminCard>
        <p className="flex items-center gap-2 text-sm font-medium">
          <CircleCheckIcon className="size-5 text-success" aria-hidden />
          Todo en orden: la API, la base, las integraciones y las tareas funcionan.
        </p>
      </AdminCard>
    )
  return (
    <AdminCard title={checks.length === 1 ? '1 cosa para revisar' : `${checks.length} cosas para revisar`}>
      <ul className="-my-2 divide-y">
        {checks.map(check => {
          const Icon = check.level === 'critical' ? CircleAlertIcon : TriangleAlertIcon
          return (
            <li key={check.title} className="flex items-start gap-2.5 py-2.5">
              <Icon
                aria-hidden
                className={cn(
                  'mt-0.5 size-4 shrink-0',
                  check.level === 'critical' ? 'text-destructive' : 'text-tone-attention-foreground',
                )}
              />
              <div className="min-w-0">
                <p className="text-sm font-medium">{check.title}</p>
                <p className="text-xs break-words text-muted-foreground">{check.detail}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </AdminCard>
  )
}
