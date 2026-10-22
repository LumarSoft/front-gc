'use client'

import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/src/components/ui/dropdown-menu'
import { FilterPill } from '@/src/features/admin/components/common/filter-pill'
import { entityLabel } from '@/src/features/admin/lib/system-activity-display'
import type { SystemActivityQuery } from '@/src/types/api/admin-system'

type SystemActivityFiltersProps = {
  query: SystemActivityQuery
  update: (changes: Partial<SystemActivityQuery>) => void
  users: { id: number; name: string }[]
  entityTypes: string[]
}

/** Who made the change and on what kind of record. */
export function SystemActivityFilters({ query, update, users, entityTypes }: SystemActivityFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2.5">
      <FilterPill
        label="Persona"
        valueLabel={users.find(user => user.id === query.userId)?.name}
        onClear={() => update({ userId: undefined })}
      >
        <DropdownMenuRadioGroup
          value={query.userId ? String(query.userId) : ''}
          onValueChange={id => update({ userId: Number(id) })}
        >
          {users.map(user => (
            <DropdownMenuRadioItem key={user.id} value={String(user.id)}>
              {user.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </FilterPill>
      <FilterPill
        label="Tipo"
        valueLabel={query.entityType && entityLabel(query.entityType)}
        onClear={() => update({ entityType: undefined })}
      >
        <DropdownMenuRadioGroup value={query.entityType ?? ''} onValueChange={entityType => update({ entityType })}>
          {entityTypes.map(type => (
            <DropdownMenuRadioItem key={type} value={type}>
              {entityLabel(type)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </FilterPill>
    </div>
  )
}
