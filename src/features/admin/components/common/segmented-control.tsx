'use client'

import { cn } from '@/src/lib/utils'

type SegmentedControlProps<T extends string> = {
  /** What is being chosen, for screen readers ("Agrupar por"). */
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  className?: string
}

/** A few mutually exclusive options side by side (chart metric, grouping), like Polaris' button group. */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className={cn('inline-flex rounded-lg bg-muted p-0.5', className)}>
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={option.value === value}
          onClick={() => onChange(option.value)}
          className={cn(
            'h-7 rounded-md px-2.5 text-xs font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
            option.value === value && 'bg-card text-foreground shadow-xs',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
