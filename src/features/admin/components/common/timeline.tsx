import { cn } from '@/src/lib/utils'

export type TimelineEvent = {
  key: string
  title: string
  /** Already formatted ("Hoy a las 18:35"). */
  at: string
  by?: string | null
  note?: string | null
}

/** Vertical history, newest first: the top dot is solid, older ones are muted. */
export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative flex flex-col gap-4">
      {events.map((event, index) => (
        <li key={event.key} className="relative flex gap-3">
          {index < events.length - 1 && (
            <span aria-hidden className="absolute top-4 -bottom-4 left-1.5 w-px -translate-x-1/2 bg-border" />
          )}
          <span
            aria-hidden
            className={cn(
              'mt-1 size-3 shrink-0 rounded-full border-2 border-card ring-1',
              index === 0 ? 'bg-foreground ring-foreground' : 'bg-muted-foreground/40 ring-border',
            )}
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="text-sm font-medium">{event.title}</p>
              <p className="text-xs text-muted-foreground">{event.at}</p>
            </div>
            {event.by && <p className="text-xs text-muted-foreground">por {event.by}</p>}
            {event.note && <p className="mt-1.5 rounded-lg bg-muted px-3 py-2 text-sm break-words">{event.note}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}
