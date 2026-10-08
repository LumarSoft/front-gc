import { Card } from '@/src/components/ui/card'
import { ListSkeleton } from '@/src/features/admin/components/common/list-skeleton'

export default function Loading() {
  return (
    <Card className="py-0">
      <ListSkeleton />
    </Card>
  )
}
