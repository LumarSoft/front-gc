'use client'

import { cn } from '@/src/lib/utils'

/** `count` (e.g. orders waiting) shows next to the label when above zero. */
export type ViewTabOption<T> = { value: T; label: string; count?: number }

type ViewTabsProps<T> = {
  label: string
  options: ViewTabOption<T>[]
  value: T
  onChange: (value: T) => void
}

/** Saved views at the top of a list card ("Todos", "Publicados"…); scrolls sideways on narrow phones. */
export function ViewTabs<T>({ label, options, value, onChange }: ViewTabsProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className="no-scrollbar flex min-w-0 gap-0.5 overflow-x-auto">
      {options.map(option => {
        const active = option.value === value
        return (
          <button
            key={option.label}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'h-7 shrink-0 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
              active && 'bg-tone-neutral text-foreground hover:bg-tone-neutral',
            )}
          >
            {option.label}
            {Boolean(option.count) && (
              <span className="ml-1.5 rounded-md bg-background/70 px-1.5 text-xs text-muted-foreground tabular-nums">
                {option.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
