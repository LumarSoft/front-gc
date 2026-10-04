import { Card } from '@/src/components/ui/card'
import { ListSkeleton } from '@/src/features/admin/components/common/list-skeleton'
import { QueryErrorState } from '@/src/features/admin/components/feedback/query-error-state'

type ListCardProps = {
  isPending: boolean
  isError: boolean
  onRetry: () => void
  isEmpty: boolean
  /** Shown when the list has no rows. */
  empty: React.ReactNode
  children?: React.ReactNode
}

/** White card that holds an admin list and its loading, error and empty states. */
export function ListCard({ isPending, isError, onRetry, isEmpty, empty, children }: ListCardProps) {
  return (
    <Card className="gap-0 py-0 shadow-xs ring-foreground/8">
      {isPending ? <ListSkeleton /> : isError ? <QueryErrorState onRetry={onRetry} /> : isEmpty ? empty : children}
    </Card>
  )
}
