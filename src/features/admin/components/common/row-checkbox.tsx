'use client'

import { CheckIcon, MinusIcon } from 'lucide-react'
import { useState } from 'react'
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
  // The mark fades out when unticked: keep the last one (dash or tick) instead of swapping it mid-fade.
  const [mark, setMark] = useState(checked)
  if (checked !== false && checked !== mark) setMark(checked)

  return (
    <CheckboxPrimitive.Root
      checked={checked}
      onCheckedChange={value => onCheckedChange(value === true)}
      aria-label={label}
      className={cn(
        'relative z-10 grid size-4 shrink-0 place-items-center rounded-sm border border-input bg-background transition-colors duration-150 outline-none after:absolute after:-inset-2.5 hover:border-foreground/60 focus-visible:ring-2 focus-visible:ring-ring data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
        className,
      )}
    >
      {/* Always mounted, so unticking shrinks the mark away instead of cutting it. */}
      <CheckboxPrimitive.Indicator
        forceMount
        className="transition-[opacity,scale] duration-150 data-[state=unchecked]:scale-50 data-[state=unchecked]:opacity-0 motion-reduce:transition-none"
      >
        {mark === 'indeterminate' ? (
          <MinusIcon strokeWidth={3} className="size-3" />
        ) : (
          <CheckIcon strokeWidth={3} className="size-3" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
