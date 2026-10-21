'use client'

import { ChevronDownIcon } from 'lucide-react'
import { FilterPillClear, PILL, PILL_OFF, PILL_ON } from '@/src/features/admin/components/common/filter-pill'
import { DateRangePicker } from '@/src/features/admin/components/date-range/date-range-picker'
import { argentineToday, type DayRange, formatRange, lastRange } from '@/src/features/admin/lib/date-range'
import { cn } from '@/src/lib/utils'

type DateFilterPillProps = {
  label: string
  /** The chosen days; undefined while the filter is off. */
  value: DayRange | undefined
  onChange: (range: DayRange) => void
  onClear: () => void
}

/** A list filter by days, like FilterPill: dashed while off, the dates and a cross once set. Opens the range picker. */
export function DateFilterPill({ label, value, onChange, onClear }: DateFilterPillProps) {
  return (
    <span className="inline-flex">
      <DateRangePicker
        value={value ?? lastRange(argentineToday(), 30, 'days', true)}
        onChange={onChange}
        trigger={
          <button type="button" className={cn(PILL, value ? cn(PILL_ON, 'rounded-r-none pr-1.5') : PILL_OFF)}>
            {value ? (
              <span className="max-w-56 truncate">
                {label}: {formatRange(value)}
              </span>
            ) : (
              label
            )}
            {!value && <ChevronDownIcon className="size-3.5" />}
          </button>
        }
      />
      {value && <FilterPillClear label={label} onClear={onClear} />}
    </span>
  )
}
