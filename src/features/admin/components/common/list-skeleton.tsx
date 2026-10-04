import { Skeleton } from '@/src/components/ui/skeleton'

type ListSkeletonProps = {
  rows?: number
}

/** Placeholder rows with the same shape as ListRow, so nothing jumps when the data arrives. */
export function ListSkeleton({ rows = 6 }: ListSkeletonProps) {
  return (
    <ul aria-hidden className="divide-y">
      {Array.from({ length: rows }, (_, index) => (
        <li key={index} className="flex items-center gap-3 px-4 py-3">
          <Skeleton className="size-10 rounded-md" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </li>
      ))}
    </ul>
  )
}
