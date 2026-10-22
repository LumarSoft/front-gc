import { ChevronRightIcon } from 'lucide-react'
import { ToneBadge } from '@/src/features/admin/components/common/tone-badge'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import type { SystemLog } from '@/src/types/api/admin-system'

/** One error or warning: level, message, where and when; opens to the whole message and the stack trace. */
export function SystemLogItem({ log }: { log: SystemLog }) {
  const error = log.level === 'ERROR'
  return (
    <li>
      <details className="group">
        <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-3 hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
          <ChevronRightIcon
            aria-hidden
            className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="line-clamp-2 text-sm font-medium break-words">{log.message}</p>
            <p className="truncate text-xs text-muted-foreground">
              {log.source}
              {log.route && ` · ${log.route}`}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <ToneBadge tone={error ? 'critical' : 'attention'}>{error ? 'Error' : 'Aviso'}</ToneBadge>
            <span className="text-xs whitespace-nowrap text-muted-foreground">
              {log.count > 1 && `×${log.count} · `}
              {formatOrderDate(log.createdAt)}
            </span>
          </div>
        </summary>
        <div className="flex flex-col gap-2 border-t bg-muted/30 px-4 py-3 pl-11 text-sm">
          <p className="break-words whitespace-pre-wrap">{log.message}</p>
          {log.count > 1 && (
            <p className="text-xs text-muted-foreground">
              Se repitió {log.count} veces, hasta {formatOrderDate(log.lastSeenAt).toLowerCase()}.
            </p>
          )}
          {log.stack && (
            <pre className="max-h-64 overflow-auto rounded-md bg-background p-3 font-mono text-xs leading-relaxed">
              {log.stack}
            </pre>
          )}
        </div>
      </details>
    </li>
  )
}
