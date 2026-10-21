'use client'

import { SearchOptionItem } from '@/src/features/search/components/search-option-item'
import type { SearchBox } from '@/src/features/search/hooks/use-search-box'
import type { SearchSection } from '@/src/features/search/lib/search-view'
import { cn } from '@/src/lib/utils'

type SearchSectionGroupProps = {
  section: SearchSection
  box: SearchBox
}

export function SearchSectionGroup({ section, box }: SearchSectionGroupProps) {
  const labelId = `${box.listboxId}-${section.id}-label`
  return (
    <div
      role="group"
      aria-labelledby={section.label ? labelId : undefined}
      // Under the results, "see all" and the assistant stay in sight while the list scrolls.
      className={cn(
        section.id === 'actions' && box.view.status !== 'empty' && 'sticky bottom-0 mt-1 border-t bg-popover py-1',
      )}
    >
      {section.label && (
        <div className="flex items-center justify-between gap-3 px-4 pt-3 pb-1.5">
          <span id={labelId} className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {section.label}
          </span>
          {section.id === 'recent' && (
            <button
              type="button"
              onClick={box.clearRecent}
              className="text-xs font-medium text-primary underline-offset-2 hover:underline"
            >
              Borrar
            </button>
          )}
        </div>
      )}
      <ul
        role="presentation"
        className={cn(
          section.layout === 'chips' ? 'flex flex-wrap gap-2 px-4 pt-0.5 pb-2' : 'px-1.5',
          section.id === 'actions' && box.view.status === 'empty' && 'px-4',
        )}
      >
        {section.options.map(option => (
          <SearchOptionItem key={option.id} option={option} layout={section.layout} box={box} />
        ))}
      </ul>
    </div>
  )
}
