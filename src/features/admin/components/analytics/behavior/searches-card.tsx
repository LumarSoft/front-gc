import { BarList, type BarListRow } from '@/src/features/admin/components/analytics/bar-list'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { pluralize } from '@/src/features/admin/lib/analytics-display'
import type { SearchRow } from '@/src/types/api/admin-behavior'

type SearchesCardProps = {
  title: string
  note: string
  rows: SearchRow[]
  empty: string
  /** Shown under the list (what to do with these searches). */
  hint?: string
}

/** Searched texts by visitors, with how many products they found. */
export function SearchesCard({ title, note, rows, empty, hint }: SearchesCardProps) {
  const list: BarListRow[] = rows.map(row => ({
    key: row.query,
    label: `“${row.query}”`,
    value: row.visitors,
    display: pluralize(row.visitors, 'visitante', 'visitantes'),
    detail:
      row.results > 0
        ? `${pluralize(row.searches, 'búsqueda', 'búsquedas')} · ${pluralize(row.results, 'resultado', 'resultados')}`
        : pluralize(row.searches, 'búsqueda', 'búsquedas'),
  }))

  return (
    <AdminCard title={title} aside={<span className="text-xs text-muted-foreground">{note}</span>}>
      <BarList rows={list} empty={empty} />
      {hint && rows.length > 0 && <p className="mt-4 border-t pt-3 text-xs text-muted-foreground">{hint}</p>}
    </AdminCard>
  )
}
