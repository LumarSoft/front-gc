'use client'

import { cn } from '@/src/lib/utils'
import type { ProductStatus } from '@/src/types/api/admin-products'

type StatusTabsProps = {
  value: ProductStatus | undefined
  onChange: (status: ProductStatus | undefined) => void
}

const OPTIONS: { value: ProductStatus | undefined; label: string }[] = [
  { value: undefined, label: 'Todos' },
  { value: 'PUBLISHED', label: 'Publicados' },
  { value: 'DRAFT', label: 'Borradores' },
  { value: 'HIDDEN', label: 'Ocultos' },
]

/** Segmented filter by status; scrolls sideways on narrow phones. */
export function StatusTabs({ value, onChange }: StatusTabsProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Estado"
      className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0"
    >
      {OPTIONS.map(option => {
        const active = option.value === value
        return (
          <button
            key={option.label}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'shrink-0 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground',
              active && 'bg-background font-medium text-foreground shadow-xs ring-1 ring-foreground/8',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
