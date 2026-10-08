'use client'

import { IndexFilters } from '@/src/features/admin/components/common/index-filters'
import { ViewTabs, type ViewTabOption } from '@/src/features/admin/components/common/view-tabs'

type ListFiltersProps<V> = {
  label: string
  views: ViewTabOption<V | undefined>[]
  view: V | undefined
  onViewChange: (view: V | undefined) => void
  term: string
  onTermChange: (term: string) => void
  placeholder: string
}

/** Views and search over a list that is already loaded whole (categories, brands, tags). */
export function ListFilters<V>({
  label,
  views,
  view,
  onViewChange,
  term,
  onTermChange,
  placeholder,
}: ListFiltersProps<V>) {
  return (
    <IndexFilters
      views={<ViewTabs label={label} options={views} value={view} onChange={onViewChange} />}
      search={{ value: term, onSearch: onTermChange, placeholder, label: `Buscar ${label.toLowerCase()}` }}
      hasFilters={term !== ''}
      onClearAll={() => onTermChange('')}
    />
  )
}
