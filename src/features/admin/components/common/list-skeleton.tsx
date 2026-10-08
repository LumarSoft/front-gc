import { Skeleton } from '@/src/components/ui/skeleton'

type ListSkeletonProps = {
  rows?: number
}

/** Placeholder rows with the same height as the list rows, so nothing jumps when the data arrives. */
export function ListSkeleton({ rows = 8 }: ListSkeletonProps) {
  return (
    <ul aria-hidden className="divide-y">
      {Array.from({ length: rows }, (_, index) => (
        <li key={index} className="flex h-12 items-center gap-3 px-4">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="h-3 w-2/5" />
          <Skeleton className="ml-auto h-3 w-16" />
          <Skeleton className="hidden h-3 w-20 sm:block" />
        </li>
      ))}
    </ul>
  )
}
