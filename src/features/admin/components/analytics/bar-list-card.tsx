import { BarList, type BarListRow } from '@/src/features/admin/components/analytics/bar-list'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'

type BarListCardProps = {
  title: string
  /** Small note beside the title ("Por facturación"). */
  note?: string
  rows: BarListRow[]
  empty?: string
}

/** A card holding one ranked list: sales by category, by payment method… */
export function BarListCard({ title, note, rows, empty = 'No hubo ventas en este período.' }: BarListCardProps) {
  return (
    <AdminCard title={title} aside={note && <span className="text-xs text-muted-foreground">{note}</span>}>
      <BarList rows={rows} empty={empty} />
    </AdminCard>
  )
}
