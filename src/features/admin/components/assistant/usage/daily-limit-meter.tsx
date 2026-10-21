import { cn } from '@/src/lib/utils'

/** Share of today's token limit already used; amber from 80 %, red once reached (the assistant pauses). */
export function DailyLimitMeter({ used, limit }: { used: number; limit: number }) {
  const percent = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0
  return (
    <div
      role="meter"
      aria-label="Límite diario de tokens usado"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-valuetext={`${percent} %`}
      className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"
    >
      <div
        className={cn(
          'h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none',
          percent >= 100 ? 'bg-destructive' : percent >= 80 ? 'bg-warning' : 'bg-chart-series',
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
