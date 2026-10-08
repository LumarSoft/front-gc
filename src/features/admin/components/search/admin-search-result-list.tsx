import { ArrowRightIcon, PackageIcon } from '@phosphor-icons/react'
import { ItemThumb } from '@/src/features/admin/components/common/item-thumb'
import type { AdminSearchGroup } from '@/src/features/admin/hooks/use-admin-search-results'
import { cn } from '@/src/lib/utils'

type AdminSearchResultListProps = {
  groups: AdminSearchGroup[]
  activeId: string | undefined
  onHover: (id: string) => void
  onPick: (id: string) => void
  emptyMessage: string
}

/** Grouped results; the highlighted one follows both the arrow keys and the mouse. */
export function AdminSearchResultList({ groups, activeId, onHover, onPick, emptyMessage }: AdminSearchResultListProps) {
  if (groups.length === 0) {
    return <p className="px-4 py-10 text-center text-sm text-muted-foreground">{emptyMessage}</p>
  }

  return (
    <div id="admin-search-results" role="listbox" className="max-h-dialog overflow-y-auto p-1.5 sm:max-h-96">
      {groups.map(group => (
        <div key={group.label} role="group" aria-label={group.label} className="pb-1">
          <p className="px-2.5 pt-2 pb-1 text-xs font-medium text-muted-foreground">{group.label}</p>
          {group.results.map(result => {
            const active = result.id === activeId
            return (
              <div
                key={result.id}
                id={`search-${result.id}`}
                role="option"
                aria-selected={active}
                onMouseMove={() => !active && onHover(result.id)}
                onClick={() => onPick(result.id)}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-1.5 text-sm',
                  active && 'bg-muted',
                )}
              >
                {result.kind === 'product' ? (
                  <ItemThumb url={result.imageUrl ?? null} fallbackIcon={PackageIcon} size="sm" />
                ) : (
                  <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground" />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{result.label}</span>
                  {result.detail && (
                    <span className="block truncate text-xs text-muted-foreground">{result.detail}</span>
                  )}
                </span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
