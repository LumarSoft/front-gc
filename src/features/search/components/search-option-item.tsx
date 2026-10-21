'use client'

import Link from 'next/link'
import { SearchOptionContent } from '@/src/features/search/components/search-option-content'
import type { SearchBox } from '@/src/features/search/hooks/use-search-box'
import type { SearchOption, SearchSection } from '@/src/features/search/lib/search-view'
import { cn } from '@/src/lib/utils'

type SearchOptionItemProps = {
  option: SearchOption
  layout: SearchSection['layout']
  box: SearchBox
}

/**
 * One option of the listbox. Links stay real links (open in a new tab, middle click) but out of the tab order: the
 * text field keeps the focus and the arrow keys move between options.
 */
export function SearchOptionItem({ option, layout, box }: SearchOptionItemProps) {
  const active = box.activeId === option.id
  const prominent = option.kind === 'assistant' && box.view.status === 'empty'
  const className = cn(
    layout === 'chips'
      ? 'inline-flex h-9 items-center rounded-full border bg-background px-3.5 text-sm transition-colors'
      : 'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
    layout === 'chips' && active && 'border-primary bg-primary/5 text-primary',
    layout === 'rows' && active && 'bg-muted',
    prominent && 'border bg-surface px-4 py-3.5',
    prominent && active && 'border-primary',
  )
  const content = <SearchOptionContent option={option} view={box.view} />

  return (
    <li
      id={box.optionId(option.id)}
      role="option"
      aria-selected={active}
      onMouseMove={() => !active && box.setActiveId(option.id)}
    >
      {'href' in option ? (
        <Link
          href={option.href}
          prefetch={false}
          tabIndex={-1}
          onClick={() => box.choose(option, false)}
          className={className}
        >
          {content}
        </Link>
      ) : (
        <div onClick={() => box.choose(option, true)} className={cn('cursor-pointer', className)}>
          {content}
        </div>
      )}
    </li>
  )
}
