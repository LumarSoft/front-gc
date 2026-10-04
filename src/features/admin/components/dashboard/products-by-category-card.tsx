'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Skeleton } from '@/src/components/ui/skeleton'
import { QueryErrorState } from '@/src/features/admin/components/feedback/query-error-state'
import { useAdminCategories } from '@/src/features/admin/hooks/use-admin-categories'
import { productsByTopCategory } from '@/src/features/admin/lib/catalog-summary'

/** How the catalog is spread across categories: spot empty or overloaded ones at a glance. */
export function ProductsByCategoryCard() {
  const { data, isPending, isError, refetch } = useAdminCategories()

  return (
    <Card className="gap-0 pb-0 shadow-xs ring-foreground/8">
      <CardHeader className="border-b">
        <CardTitle>Productos por categoría</CardTitle>
        <CardDescription>Incluye los de cada subcategoría.</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        {isError ? (
          <QueryErrorState onRetry={() => void refetch()} />
        ) : (
          <ul className="divide-y">
            {isPending
              ? Array.from({ length: 5 }, (_, index) => (
                  <li key={index} className="px-4 py-3">
                    <Skeleton className="h-4 w-full" />
                  </li>
                ))
              : productsByTopCategory(data).map(share => (
                  <li key={share.id} className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-3">
                    <span className="min-w-0 flex-1 truncate text-sm sm:w-48 sm:flex-none">{share.name}</span>
                    <span
                      aria-hidden
                      className="order-last h-1.5 basis-full overflow-hidden rounded-full bg-muted sm:order-none sm:flex-1 sm:basis-auto"
                    >
                      {/* Width is data: the only inline style in the admin. */}
                      <span
                        className="block h-full rounded-full bg-primary/70"
                        style={{ width: `${share.percent}%` }}
                      />
                    </span>
                    <span className="w-10 text-right text-sm font-medium tabular-nums">{share.products}</span>
                  </li>
                ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
