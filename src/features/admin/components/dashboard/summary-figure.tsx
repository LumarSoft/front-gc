import { cn } from '@/src/lib/utils'

type SummaryFigureProps = {
  label: string
  value: number | null
  /** Process color of the tick above the number (print motif). */
  tone: 'cyan' | 'magenta' | 'yellow' | 'key'
  className?: string
}

const TONE_CLASS: Record<SummaryFigureProps['tone'], string> = {
  cyan: 'bg-cyan',
  magenta: 'bg-magenta',
  yellow: 'bg-yellow',
  key: 'bg-foreground',
}

/** One big number with its label. `null` renders a placeholder while loading. */
export function SummaryFigure({ label, value, tone, className }: SummaryFigureProps) {
  return (
    <div className={cn('flex flex-col gap-2 bg-background p-4 sm:p-5', className)}>
      <span aria-hidden className={cn('h-1 w-6 rounded-full', TONE_CLASS[tone])} />
      {value === null ? (
        <span className="h-9 w-14 animate-pulse rounded-md bg-muted" />
      ) : (
        <span className="text-3xl font-extrabold tracking-tight tabular-nums lg:text-4xl">{value}</span>
      )}
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}
