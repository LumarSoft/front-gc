import Link from 'next/link'
import { ChevronRightIcon } from 'lucide-react'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import { actionLabel, changeValue, entityHref } from '@/src/features/admin/lib/system-activity-display'
import type { SystemActivity } from '@/src/types/api/admin-system'

/** One change made in the admin: who, what and when; opens to the fields that changed, before → after. */
export function SystemActivityItem({ entry }: { entry: SystemActivity }) {
  const href = entityHref(entry)
  const fields = Object.entries(entry.changes ?? {})
  return (
    <li>
      <details className="group">
        <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-3 hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
          <ChevronRightIcon
            aria-hidden
            className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
          />
          <p className="min-w-0 flex-1 text-sm">
            <span className="font-semibold">{entry.user?.name ?? 'Cuenta borrada'}</span> {actionLabel(entry.action)}
            {entry.entityId !== null && (
              <span className="text-muted-foreground">
                {' · '}
                {href ? (
                  <Link href={href} className="text-primary hover:underline">
                    #{entry.entityId}
                  </Link>
                ) : (
                  `#${entry.entityId}`
                )}
              </span>
            )}
          </p>
          <span className="shrink-0 text-xs whitespace-nowrap text-muted-foreground">
            {formatOrderDate(entry.createdAt)}
          </span>
        </summary>
        <div className="flex flex-col gap-2 border-t bg-muted/30 px-4 py-3 pl-11 text-sm">
          {fields.length ? (
            <table className="w-full table-fixed text-left text-xs">
              <thead className="text-muted-foreground">
                <tr>
                  <th className="w-1/4 pb-1 font-medium">Campo</th>
                  <th className="pb-1 font-medium">Antes</th>
                  <th className="pb-1 font-medium">Después</th>
                </tr>
              </thead>
              <tbody className="align-top">
                {fields.map(([field, change]) => (
                  <tr key={field} className="border-t">
                    <td className="py-1.5 pr-2 font-mono break-words">{field}</td>
                    <td className="py-1.5 pr-2 break-words text-muted-foreground">{changeValue(change?.from)}</td>
                    <td className="py-1.5 break-words">{changeValue(change?.to)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-xs text-muted-foreground">Esta acción no guarda campos cambiados.</p>
          )}
          <p className="text-xs text-muted-foreground">
            {entry.action}
            {entry.user && ` · ${entry.user.email}`}
            {entry.ipAddress && ` · IP ${entry.ipAddress}`}
          </p>
        </div>
      </details>
    </li>
  )
}
