'use client'

import { useState } from 'react'
import { FunnelSimpleIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { SearchInput } from '@/src/features/admin/components/common/search-input'

type IndexFiltersProps = {
  /** Saved views (ViewTabs), shown while not searching. */
  views: React.ReactNode
  search: { value: string; onSearch: (value: string) => void; placeholder: string; label: string }
  /** Filter pills, shown while searching. */
  filters?: React.ReactNode
  sort?: React.ReactNode
  /** Search or filters are applied: the search row stays open. */
  hasFilters: boolean
  onClearAll: () => void
}

/**
 * Top of a list card, Shopify style: views and a "search and filter" button; the button swaps the views for a
 * search box with the filter pills underneath. "Cancelar" clears everything and goes back to the views.
 */
export function IndexFilters({ views, search, filters, sort, hasFilters, onClearAll }: IndexFiltersProps) {
  const [searching, setSearching] = useState(hasFilters)
  const open = searching || hasFilters

  return (
    <div className="border-b">
      <div className="flex min-h-12 items-center gap-2 px-2 py-2">
        {open ? (
          <>
            <div className="min-w-0 flex-1 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-left-1">
              <SearchInput {...search} autoFocus={searching && !hasFilters} />
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                setSearching(false)
                onClearAll()
              }}
            >
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <div className="min-w-0 flex-1">{views}</div>
            <Button variant="outline" onClick={() => setSearching(true)} aria-label="Buscar y filtrar">
              <MagnifyingGlassIcon />
              <FunnelSimpleIcon />
            </Button>
          </>
        )}
        {sort}
      </div>
      {open && filters && (
        <div className="flex flex-wrap items-center gap-1.5 px-2 pb-2 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-1">
          {filters}
        </div>
      )}
    </div>
  )
}
