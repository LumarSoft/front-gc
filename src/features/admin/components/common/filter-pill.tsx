'use client'

import { CaretDownIcon, XIcon } from '@phosphor-icons/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/src/components/ui/dropdown-menu'
import { cn } from '@/src/lib/utils'

type FilterPillProps = {
  label: string
  /** What is selected ("Impresoras"); empty while the filter is off. */
  valueLabel?: string
  onClear: () => void
  /** Menu with the options (radio items). */
  children: React.ReactNode
}

export const PILL =
  'inline-flex h-7 items-center gap-1 rounded-lg px-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
export const PILL_OFF = 'border border-dashed border-input text-muted-foreground hover:border-solid hover:bg-muted'
export const PILL_ON = 'bg-tone-neutral text-foreground hover:bg-tone-neutral/80'

/** A filter of a list: dashed while off; once set it shows the value and a cross to remove it. */
export function FilterPill({ label, valueLabel, onClear, children }: FilterPillProps) {
  const active = Boolean(valueLabel)

  return (
    <span className="inline-flex">
      <DropdownMenu>
        <DropdownMenuTrigger className={cn(PILL, active ? cn(PILL_ON, 'rounded-r-none pr-1.5') : PILL_OFF)}>
          {active ? (
            <span className="max-w-48 truncate">
              {label}: {valueLabel}
            </span>
          ) : (
            label
          )}
          {!active && <CaretDownIcon className="size-3.5" />}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="max-h-80 w-60">
          {children}
        </DropdownMenuContent>
      </DropdownMenu>
      {active && (
        <button
          type="button"
          onClick={onClear}
          aria-label={`Quitar el filtro ${label}`}
          className={cn(PILL, PILL_ON, 'rounded-l-none border-l border-background pr-2 pl-1.5')}
        >
          <XIcon className="size-3.5" />
        </button>
      )}
    </span>
  )
}
