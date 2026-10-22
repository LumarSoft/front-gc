'use client'

import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/src/components/ui/dropdown-menu'
import { FilterPill } from '@/src/features/admin/components/common/filter-pill'
import { IndexFilters } from '@/src/features/admin/components/common/index-filters'
import { ViewTabs } from '@/src/features/admin/components/common/view-tabs'
import type { SystemLogLevel, SystemLogsQuery } from '@/src/types/api/admin-system'

const LEVEL_VIEWS: { value: SystemLogLevel | undefined; label: string }[] = [
  { value: undefined, label: 'Todos' },
  { value: 'ERROR', label: 'Errores' },
  { value: 'WARN', label: 'Avisos' },
]

type SystemLogsFiltersProps = {
  query: SystemLogsQuery
  update: (changes: Partial<SystemLogsQuery>) => void
  sources: { source: string; count: number }[]
}

/** Errors or warnings, a search in the messages and routes, and who logged them. */
export function SystemLogsFilters({ query, update, sources }: SystemLogsFiltersProps) {
  return (
    <IndexFilters
      views={<ViewTabs label="Nivel" options={LEVEL_VIEWS} value={query.level} onChange={level => update({ level })} />}
      search={{
        value: query.q ?? '',
        onSearch: q => update({ q: q || undefined }),
        placeholder: 'Buscá en los mensajes y rutas',
        label: 'Buscar errores',
      }}
      filters={
        <FilterPill label="Origen" valueLabel={query.source} onClear={() => update({ source: undefined })}>
          <DropdownMenuRadioGroup value={query.source ?? ''} onValueChange={source => update({ source })}>
            {sources.map(option => (
              <DropdownMenuRadioItem key={option.source} value={option.source}>
                <span className="flex-1 truncate">{option.source}</span>
                <span className="text-xs text-muted-foreground tabular-nums">{option.count}</span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </FilterPill>
      }
      hasFilters={Boolean(query.q || query.source)}
      onClearAll={() => update({ q: undefined, source: undefined })}
    />
  )
}
