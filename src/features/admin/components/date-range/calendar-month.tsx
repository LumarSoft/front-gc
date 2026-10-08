import type { DraftRange } from '@/src/features/admin/hooks/use-date-range-picker'
import { monthGrid } from '@/src/features/admin/lib/date-range'
import { cn } from '@/src/lib/utils'

const WEEKDAYS = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']
const monthTitle = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric', timeZone: 'UTC' })
const dayLabel = new Intl.DateTimeFormat('es-AR', { dateStyle: 'full', timeZone: 'UTC' })

type CalendarMonthProps = {
  year: number
  month: number
  draft: DraftRange
  /** Day under the pointer while the second end is being picked: previews the range. */
  hovered: string | null
  today: string
  onPick: (day: string) => void
  onHover: (day: string | null) => void
}

/** One month, Monday first. The range is a continuous band; its ends are dark squares, future days are disabled. */
export function CalendarMonth({ year, month, draft, hovered, today, onPick, onHover }: CalendarMonthProps) {
  const end = draft.to ?? hovered ?? draft.from
  const [low, high] = draft.from <= end ? [draft.from, end] : [end, draft.from]

  return (
    <div className="flex flex-col gap-2">
      <p className="text-center text-sm font-semibold first-letter:uppercase">
        {monthTitle.format(new Date(Date.UTC(year, month, 1)))}
      </p>
      <table className="w-full border-collapse text-sm" role="grid">
        <thead>
          <tr>
            {WEEKDAYS.map(day => (
              <th key={day} scope="col" className="h-8 text-xs font-normal text-muted-foreground">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody onPointerLeave={() => onHover(null)}>
          {monthGrid(year, month).map((week, index) => (
            <tr key={index}>
              {week.map((day, column) => {
                if (!day) return <td key={column} />
                const inRange = day >= low && day <= high
                const isEnd = day === low || day === high
                const future = day > today
                return (
                  <td
                    key={day}
                    className={cn(
                      'p-0',
                      inRange && 'bg-muted',
                      day === low && 'rounded-l-lg',
                      day === high && 'rounded-r-lg',
                    )}
                  >
                    <button
                      type="button"
                      disabled={future}
                      onClick={() => onPick(day)}
                      onPointerEnter={() => onHover(day)}
                      aria-label={dayLabel.format(new Date(`${day}T00:00:00Z`))}
                      aria-pressed={isEnd}
                      className={cn(
                        'grid h-9 w-full place-items-center rounded-lg tabular-nums transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        !isEnd && !future && 'hover:bg-tone-neutral',
                        isEnd && 'bg-foreground font-medium text-background',
                        future && 'cursor-default text-muted-foreground/40',
                      )}
                    >
                      {Number(day.slice(8))}
                    </button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
