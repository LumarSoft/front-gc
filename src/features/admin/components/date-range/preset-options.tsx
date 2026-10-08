import { CheckboxField } from '@/src/components/ui/checkbox-field'
import { Input } from '@/src/components/ui/input'
import type { DateRangePickerState } from '@/src/features/admin/hooks/use-date-range-picker'
import { type LastUnit, type PeriodToDate, recentQuarters } from '@/src/features/admin/lib/date-range'
import { cn } from '@/src/lib/utils'

const UNITS: { value: LastUnit; label: string }[] = [
  { value: 'days', label: 'Días' },
  { value: 'weeks', label: 'Semanas' },
  { value: 'months', label: 'Meses' },
]
const PERIODS: { value: PeriodToDate; label: string }[] = [
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mes' },
  { value: 'quarter', label: 'Trimestre' },
  { value: 'year', label: 'Año' },
]

const CHIP =
  'h-8 shrink-0 rounded-lg border px-3 text-sm transition-colors hover:bg-table-head focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'
const CHIP_ON = 'border-foreground bg-foreground text-background hover:bg-foreground'

/** The controls of the chosen preset, above the calendar ("Último 30 Días · Incluir hoy", period, quarter). */
export function PresetOptions({ picker }: { picker: DateRangePickerState }) {
  if (picker.preset === 'last') {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor="range-last-amount" className="text-sm">
          Último
        </label>
        <Input
          id="range-last-amount"
          inputMode="numeric"
          value={picker.last.amount}
          onChange={event => picker.updateLast({ amount: event.target.value.replace(/\D/g, '').slice(0, 3) })}
          className="h-8 w-20 tabular-nums"
        />
        <select
          aria-label="Unidad"
          value={picker.last.unit}
          onChange={event => picker.updateLast({ unit: event.target.value as LastUnit })}
          className="h-8 rounded-lg border border-input bg-background px-2 text-sm"
        >
          {UNITS.map(unit => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
        <CheckboxField
          id="range-include-today"
          label="Incluir hoy"
          checked={picker.last.includeToday}
          onCheckedChange={includeToday => picker.updateLast({ includeToday })}
        />
      </div>
    )
  }
  if (picker.preset === 'toDate') {
    return (
      <div role="radiogroup" aria-label="Período hasta hoy" className="no-scrollbar flex gap-1.5 overflow-x-auto">
        {PERIODS.map(period => (
          <button
            key={period.value}
            type="button"
            role="radio"
            aria-checked={picker.period === period.value}
            onClick={() => picker.choosePeriod(period.value)}
            className={cn(CHIP, picker.period === period.value && CHIP_ON)}
          >
            {period.label} hasta hoy
          </button>
        ))}
      </div>
    )
  }
  if (picker.preset === 'quarter') {
    return (
      <div role="radiogroup" aria-label="Trimestre" className="no-scrollbar flex gap-1.5 overflow-x-auto">
        {recentQuarters(picker.today).map((quarter, index) => (
          <button
            key={quarter.label}
            type="button"
            role="radio"
            aria-checked={picker.quarter === index}
            onClick={() => picker.chooseQuarter(index)}
            className={cn(CHIP, picker.quarter === index && CHIP_ON)}
          >
            {quarter.label}
          </button>
        ))}
      </div>
    )
  }
  return (
    <p className="flex h-8 items-center text-sm text-muted-foreground">
      {picker.draft.to ? 'Elegí otro día para empezar un rango nuevo.' : 'Elegí el último día del período.'}
    </p>
  )
}
