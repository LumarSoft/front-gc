import type { DateRangePickerState, RangePreset } from '@/src/features/admin/hooks/use-date-range-picker'
import { cn } from '@/src/lib/utils'

const PRESETS: { value: RangePreset; label: string; divider?: boolean }[] = [
  { value: 'today', label: 'Hoy' },
  { value: 'yesterday', label: 'Ayer' },
  { value: 'last', label: 'Últimos', divider: true },
  { value: 'toDate', label: 'Período hasta la fecha' },
  { value: 'quarter', label: 'Trimestres', divider: true },
  { value: 'custom', label: 'Rango personalizado', divider: true },
]

/** Quick choices: a column on the left from sm up, a scrollable row of pills on phones. */
export function RangePresets({ picker }: { picker: DateRangePickerState }) {
  return (
    <div
      role="radiogroup"
      aria-label="Período"
      className="no-scrollbar flex gap-1 overflow-x-auto border-b bg-table-head p-2 sm:w-48 sm:shrink-0 sm:flex-col sm:overflow-visible sm:border-r sm:border-b-0"
    >
      {PRESETS.map(preset => (
        <button
          key={preset.value}
          type="button"
          role="radio"
          aria-checked={picker.preset === preset.value}
          onClick={() => picker.choose(preset.value)}
          className={cn(
            'shrink-0 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors hover:bg-tone-neutral focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
            picker.preset === preset.value && 'bg-tone-neutral font-medium',
            preset.divider && 'sm:mt-2',
          )}
        >
          {preset.label}
        </button>
      ))}
    </div>
  )
}
