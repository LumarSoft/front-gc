'use client'

import { CalendarIcon } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover'
import { PresetOptions } from '@/src/features/admin/components/date-range/preset-options'
import { RangeCalendar } from '@/src/features/admin/components/date-range/range-calendar'
import { RangePresets } from '@/src/features/admin/components/date-range/range-presets'
import { useDateRangePicker } from '@/src/features/admin/hooks/use-date-range-picker'
import { type DayRange, describeRange, formatRange } from '@/src/features/admin/lib/date-range'

type DateRangePickerProps = {
  value: DayRange
  onChange: (range: DayRange) => void
}

/** Shopify-style period picker: presets, "Último N…", two-month calendar; applies on "Aplicar". */
export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const picker = useDateRangePicker(value, onChange)

  return (
    <Popover open={picker.open} onOpenChange={picker.setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex h-8 shrink-0 items-center gap-1.5 self-start rounded-lg px-2 text-sm font-medium transition-colors hover:bg-tone-neutral focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none aria-expanded:bg-tone-neutral"
        >
          <CalendarIcon className="size-4 text-muted-foreground" />
          {describeRange(value, picker.today)}
        </button>
      </PopoverTrigger>
      {/* Wide enough for two months; on phones it spans the screen minus its margins (collisionPadding). */}
      <PopoverContent
        align="start"
        collisionPadding={12}
        className="flex w-[calc(100vw-1.5rem)] flex-col overflow-hidden p-0 sm:w-auto sm:flex-row"
      >
        <RangePresets picker={picker} />
        <div className="flex min-w-0 flex-col sm:w-136">
          <div className="flex flex-col gap-4 p-4">
            <PresetOptions picker={picker} />
            <RangeCalendar picker={picker} />
          </div>
          <div className="flex items-center justify-between gap-3 border-t px-4 py-3">
            <p className="text-sm text-muted-foreground tabular-nums">
              {picker.draft.to ? formatRange({ from: picker.draft.from, to: picker.draft.to }) : 'Elegí el último día'}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => picker.setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={picker.apply} disabled={!picker.canApply}>
                Aplicar
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
