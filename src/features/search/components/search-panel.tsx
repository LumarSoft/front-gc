'use client'

import { SearchSectionGroup } from '@/src/features/search/components/search-section-group'
import { SearchStatus } from '@/src/features/search/components/search-status'
import type { SearchBox } from '@/src/features/search/hooks/use-search-box'
import { cn } from '@/src/lib/utils'

type SearchPanelProps = {
  box: SearchBox
  className?: string
  onTouchMove?: () => void
}

/** What the search box offers: recent and popular searches before typing, then products, categories and actions. */
export function SearchPanel({ box, className, onTouchMove }: SearchPanelProps) {
  return (
    <div onTouchMove={onTouchMove} className={cn('flex flex-col', className)}>
      <SearchStatus view={box.view} />
      <div id={box.listboxId} role="listbox" aria-label="Sugerencias de búsqueda" className="pt-1 pb-2">
        {box.view.sections.map(section => (
          <SearchSectionGroup key={section.id} section={section} box={box} />
        ))}
      </div>
    </div>
  )
}
