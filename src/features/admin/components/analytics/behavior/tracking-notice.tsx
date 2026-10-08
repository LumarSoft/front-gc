import { InfoIcon } from '@phosphor-icons/react/dist/ssr'
import { formatRange } from '@/src/features/admin/lib/date-range'
import type { AdminBehavior } from '@/src/types/api/admin-behavior'

/**
 * Visits are measured since the tracking went live: days before that have no data, not zero visits. Says so when the
 * period (or the one it is compared with) starts earlier.
 */
export function TrackingNotice({ behavior }: { behavior: AdminBehavior }) {
  const { trackingSince, period } = behavior
  if (trackingSince && trackingSince <= period.previousFrom) return null
  const since = trackingSince ? formatRange({ from: trackingSince, to: trackingSince }) : null

  return (
    <p className="flex items-start gap-2 rounded-xl bg-tone-info px-3 py-2.5 text-sm text-tone-info-foreground">
      <InfoIcon className="mt-0.5 size-4 shrink-0" />
      {!since
        ? 'Todavía no hay visitas registradas. Se cuentan desde que esta versión de la tienda está publicada.'
        : trackingSince! > period.to
          ? `Las visitas se miden desde el ${since}: este período es anterior y no tiene datos.`
          : `Las visitas se miden desde el ${since}. Antes no hay datos, así que la comparación con el período anterior todavía no es pareja.`}
    </p>
  )
}
