'use client'

import { PILL, PILL_OFF, PILL_ON } from '@/src/features/admin/components/common/filter-pill'
import { cn } from '@/src/lib/utils'

type ToggleFilterPillProps = {
  label: string
  pressed: boolean
  onPressedChange: (pressed: boolean) => void
}

/** On/off filter with no options ("Sin stock"). */
export function ToggleFilterPill({ label, pressed, onPressedChange }: ToggleFilterPillProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => onPressedChange(!pressed)}
      className={cn(PILL, pressed ? PILL_ON : PILL_OFF)}
    >
      {label}
    </button>
  )
}
