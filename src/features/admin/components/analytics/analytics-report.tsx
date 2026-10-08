import { AnalyticsKpis } from '@/src/features/admin/components/analytics/analytics-kpis'
import { BarListCard } from '@/src/features/admin/components/analytics/bar-list-card'
import { CustomersCard } from '@/src/features/admin/components/analytics/customers-card'
import { OrderOutcomesCard } from '@/src/features/admin/components/analytics/order-outcomes-card'
import { SalesBreakdownCard } from '@/src/features/admin/components/analytics/sales-breakdown-card'
import { SalesOverTimeCard } from '@/src/features/admin/components/analytics/sales-over-time-card'
import { TopProductsCard } from '@/src/features/admin/components/analytics/top-products-card'
import {
  BUYER_TYPE_LABEL,
  DELIVERY_METHOD_LABEL,
  PAYMENT_METHOD_LABEL,
} from '@/src/features/admin/lib/analytics-display'
import { mixRows, rankRows } from '@/src/features/admin/lib/analytics-rows'
import type { AdminAnalytics } from '@/src/types/api/admin-analytics'

/** Every card of the stats page, from the headline numbers down to how customers pay and receive. */
export function AnalyticsReport({ analytics }: { analytics: AdminAnalytics }) {
  return (
    <div className="flex flex-col gap-4">
      <AnalyticsKpis analytics={analytics} />
      <SalesOverTimeCard analytics={analytics} />
      <div className="grid items-start gap-4 lg:grid-cols-2">
        <SalesBreakdownCard analytics={analytics} />
        <OrderOutcomesCard analytics={analytics} />
      </div>
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <TopProductsCard bySales={analytics.products} byUnits={analytics.productsByUnits} />
        <div className="flex flex-col gap-4">
          <BarListCard title="Ventas por categoría" note="Productos, sin envío" rows={rankRows(analytics.categories)} />
          {/* With a single brand (today, Epson) the ranking says nothing. */}
          {analytics.brands.length > 1 && (
            <BarListCard title="Ventas por marca" note="Productos, sin envío" rows={rankRows(analytics.brands)} />
          )}
        </div>
      </div>
      <div className="grid items-start gap-4 lg:grid-cols-2">
        <CustomersCard customers={analytics.customers} />
        <BarListCard title="Ventas por tipo de cliente" rows={mixRows(analytics.buyerTypes, BUYER_TYPE_LABEL)} />
        <BarListCard title="Medios de pago" rows={mixRows(analytics.paymentMethods, PAYMENT_METHOD_LABEL)} />
        <BarListCard title="Formas de entrega" rows={mixRows(analytics.deliveryMethods, DELIVERY_METHOD_LABEL)} />
      </div>
    </div>
  )
}
