'use client'

import { CheckIcon, MinusIcon } from '@phosphor-icons/react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'
import { cn } from '@/src/lib/utils'

type RowCheckboxProps = {
  checked: boolean | 'indeterminate'
  onCheckedChange: (checked: boolean) => void
  label: string
  className?: string
}

/**
 * Selection box of a list row (or of the whole page, with the "some selected" dash). Sits above the row's link, so
 * ticking it never opens the item; its hit area is larger than the box.
 */
export function RowCheckbox({ checked, onCheckedChange, label, className }: RowCheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      onCheckedChange={value => onCheckedChange(value === true)}
      aria-label={label}
      className={cn(
        'relative z-10 grid size-4 shrink-0 place-items-center rounded-sm border border-input bg-background transition-colors outline-none after:absolute after:-inset-2.5 hover:border-foreground/60 focus-visible:ring-2 focus-visible:ring-ring data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
        className,
      )}
    >
      <CheckboxPrimitive.Indicator className="motion-safe:animate-in motion-safe:zoom-in-50">
        {checked === 'indeterminate' ? (
          <MinusIcon weight="bold" className="size-3" />
        ) : (
          <CheckIcon weight="bold" className="size-3" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
