'use client'

import { IndexFilters } from '@/src/features/admin/components/common/index-filters'
import { ViewTabs } from '@/src/features/admin/components/common/view-tabs'
import { useAdminOrderCounts } from '@/src/features/admin/hooks/use-admin-orders'
import { useOrderListParams } from '@/src/features/admin/hooks/use-order-list-params'
import { ORDER_STAGE_VIEWS } from '@/src/features/admin/lib/order-display'

/** Stage views with how many orders wait in each, and the search by number, customer or email. */
export function OrdersFilters() {
  const { query, update, hasSearch } = useOrderListParams()
  const { data: counts } = useAdminOrderCounts()
  const views = ORDER_STAGE_VIEWS.map(view => ({
    ...view,
    count: view.value && view.value !== 'CLOSED' ? counts?.[view.value] : undefined,
  }))

  return (
    <IndexFilters
      views={<ViewTabs label="Etapa" options={views} value={query.stage} onChange={stage => update({ stage })} />}
      search={{
        value: query.q ?? '',
        onSearch: q => update({ q: q || undefined }),
        placeholder: 'Buscá por número, cliente o email',
        label: 'Buscar pedidos',
      }}
      hasFilters={hasSearch}
      onClearAll={() => update({ q: undefined })}
    />
  )
}
