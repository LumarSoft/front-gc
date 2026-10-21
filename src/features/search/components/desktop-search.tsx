'use client'

import { useRef } from 'react'
import { Search } from 'lucide-react'
import { CmykStripe } from '@/src/components/layout/cmyk-stripe'
import { SearchInput } from '@/src/features/search/components/search-input'
import { SearchPanel } from '@/src/features/search/components/search-panel'
import { useSearchBox } from '@/src/features/search/hooks/use-search-box'
import { cn } from '@/src/lib/utils'

type DesktopSearchProps = {
  initialQuery: string
  className?: string
}

/** The header search from tablets up: suggestions open in a panel right under the field. */
export function DesktopSearch({ initialQuery, className }: DesktopSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const box = useSearchBox(initialQuery, inputRef)
  return (
    <form
      action="/productos"
      role="search"
      onSubmit={event => {
        event.preventDefault()
        box.submit()
      }}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) box.close()
      }}
      className={cn('relative', className)}
    >
      <label htmlFor="site-search" className="sr-only">
        Buscar productos
      </label>
      <SearchInput
        box={box}
        inputRef={inputRef}
        id="site-search"
        className="h-11 rounded-xl border-border bg-muted/60 pr-12 pl-4 text-sm focus-visible:border-primary focus-visible:bg-background"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
      >
        <Search className="size-4.5" aria-hidden />
      </button>
      {box.isOpen && (
        // Clicks inside keep the focus in the field, so the panel stays open until something is picked.
        <div
          onMouseDown={event => event.preventDefault()}
          className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-xl shadow-foreground/10"
        >
          <CmykStripe />
          <SearchPanel box={box} className="max-h-dropdown overflow-y-auto overscroll-contain" />
        </div>
      )}
    </form>
  )
}
