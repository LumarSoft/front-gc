import Link from 'next/link'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { formatCount } from '@/src/features/admin/lib/assistant-display'
import type { AssistantEmptySearch } from '@/src/types/api/admin-assistant'

/**
 * What the assistant searched for and found nothing: a product the store could load, or a word the search should
 * understand. Each one opens the latest conversation that searched it.
 */
export function EmptySearchesCard({ searches }: { searches: AssistantEmptySearch[] }) {
  return (
    <AdminCard title="Búsquedas sin resultados">
      {searches.length === 0 ? (
        <p className="text-sm text-muted-foreground">En estos días, todas las búsquedas del asesor encontraron algo.</p>
      ) : (
        <ul className="-my-2 divide-y">
          {searches.map(search => (
            <li key={search.text} className="flex items-baseline gap-3 py-2 text-sm">
              <span className="min-w-0 flex-1 font-medium break-words">«{search.text}»</span>
              <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                {search.searches === 1 ? '1 vez' : `${formatCount(search.searches)} veces`}
              </span>
              <Link
                href={`/admin/asistente/${search.lastConversationId}`}
                className="shrink-0 text-xs font-medium text-primary hover:underline"
              >
                Ver conversación
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AdminCard>
  )
}
