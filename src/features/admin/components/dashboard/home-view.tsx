'use client'

import { Card } from '@/src/components/ui/card'
import { HomeSkeleton } from '@/src/features/admin/components/dashboard/home-skeleton'
import { HomeTodos } from '@/src/features/admin/components/dashboard/home-todos'
import { MetricsStrip } from '@/src/features/admin/components/dashboard/metrics-strip'
import { RecentOrdersCard } from '@/src/features/admin/components/dashboard/recent-orders-card'
import { SalesCard } from '@/src/features/admin/components/dashboard/sales-card'
import { QueryErrorState } from '@/src/features/admin/components/feedback/query-error-state'
import { DateRangePicker } from '@/src/features/admin/components/date-range/date-range-picker'
import { useAdminDashboard } from '@/src/features/admin/hooks/use-admin-dashboard'
import { useDashboardRange } from '@/src/features/admin/hooks/use-dashboard-range'
import { useAdminOrderCounts } from '@/src/features/admin/hooks/use-admin-orders'
import { homeTodos } from '@/src/features/admin/lib/home-todos'
import { cn } from '@/src/lib/utils'

/** Admin home, Shopify style: the month at a glance, what is waiting, sales and the latest orders. */
export function HomeView() {
  const { range, setRange } = useDashboardRange()
  const { data: dashboard, isPending, isError, isPlaceholderData, refetch } = useAdminDashboard(range)
  const { data: orderCounts } = useAdminOrderCounts()

  if (isPending) return <HomeSkeleton />
  if (isError || !dashboard) {
    return (
      <Card className="py-0">
        <QueryErrorState message="No pudimos cargar el resumen." onRetry={() => void refetch()} />
      </Card>
    )
  }

  const todos = homeTodos(orderCounts, dashboard.todo)
  return (
    <div className="mx-auto flex max-w-5xl flex-col">
      <MetricsStrip dashboard={dashboard} picker={<DateRangePicker value={range} onChange={setRange} />} />
      <header className="mt-10 mb-5 text-center sm:mt-14">
        <h1 className="text-2xl leading-tight font-semibold tracking-tight">
          ¡Hola!
          <span className="block">
            {todos.length > 0 ? 'Esto es lo que espera tu atención.' : 'Sigamos haciendo crecer el negocio.'}
          </span>
        </h1>
      </header>
      <div className="flex justify-center">
        <HomeTodos todos={todos} />
      </div>
      <div className="mt-10 grid items-start gap-4 sm:mt-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* While another period loads, the current one fades instead of jumping to a skeleton. */}
        <div className={cn('transition-opacity duration-200', isPlaceholderData && 'opacity-50')}>
          <SalesCard dashboard={dashboard} />
        </div>
        <RecentOrdersCard />
      </div>
    </div>
  )
}
