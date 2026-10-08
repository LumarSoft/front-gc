import { cn } from '@/src/lib/utils'

type ListRowProps = {
  leading?: React.ReactNode
  /** Usually a ListRowButton: its hit area covers the row, like the rows of IndexTable. */
  title: React.ReactNode
  meta?: React.ReactNode
  /** Badges and counts. On phones they wrap under the title. */
  details?: React.ReactNode
  actions?: React.ReactNode
  /** Rows that are inactive look muted, so the eye skips them. */
  muted?: boolean
  className?: string
}

/** One row of an admin list: thumb, title + meta, details and the "…" menu. Works as a card row on phones. */
export function ListRow({ leading, title, meta, details, actions, muted = false, className }: ListRowProps) {
  return (
    <li
      className={cn(
        'relative flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-table-head has-focus-visible:bg-table-head',
        className,
      )}
    >
      {leading}
      <div
        className={cn('flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-4', muted && 'opacity-60')}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{title}</p>
          {meta && <p className="truncate text-xs text-muted-foreground">{meta}</p>}
        </div>
        {details && <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-4">{details}</div>}
      </div>
      {/* Above the title's stretched hit area, so the menu still opens. */}
      {actions && <div className="relative z-10">{actions}</div>}
    </li>
  )
}

/** The row's main action (usually "Editar"); any click on the row triggers it. */
export function ListRowButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="truncate text-left after:absolute after:inset-0 focus-visible:outline-none"
    >
      {children}
    </button>
  )
}
