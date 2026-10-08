import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { CalendarMonth } from '@/src/features/admin/components/date-range/calendar-month'
import type { DateRangePickerState } from '@/src/features/admin/hooks/use-date-range-picker'

/** Two months side by side (one on phones), with arrows to move through the year. */
export function RangeCalendar({ picker }: { picker: DateRangePickerState }) {
  const { year, month } = picker.visible
  const previous = new Date(Date.UTC(year, month - 1, 1))
  const atCurrentMonth = `${year}-${String(month + 1).padStart(2, '0')}` >= picker.today.slice(0, 7)
  const monthProps = {
    draft: picker.draft,
    hovered: picker.draft.to ? null : picker.hovered,
    today: picker.today,
    onPick: picker.pickDay,
    onHover: picker.setHovered,
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute top-0 left-0"
        onClick={() => picker.moveMonth(-1)}
        aria-label="Mes anterior"
      >
        <CaretLeftIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute top-0 right-0"
        onClick={() => picker.moveMonth(1)}
        disabled={atCurrentMonth}
        aria-label="Mes siguiente"
      >
        <CaretRightIcon />
      </Button>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="max-sm:hidden">
          <CalendarMonth year={previous.getUTCFullYear()} month={previous.getUTCMonth()} {...monthProps} />
        </div>
        <CalendarMonth year={year} month={month} {...monthProps} />
      </div>
    </div>
  )
}
