'use client'

import { IndexFilters } from '@/src/features/admin/components/common/index-filters'
import { ViewTabs } from '@/src/features/admin/components/common/view-tabs'
import { useAdminWholesaleCounts } from '@/src/features/admin/hooks/use-admin-wholesale'
import { useWholesaleListParams } from '@/src/features/admin/hooks/use-wholesale-list-params'
import { WHOLESALE_STATUS_VIEWS } from '@/src/features/admin/lib/wholesale-display'

/** Status views with how many applications each holds, and the search by company, CUIT or email. */
export function WholesaleFilters() {
  const { query, update, hasSearch } = useWholesaleListParams()
  const { data: counts } = useAdminWholesaleCounts()
  const views = WHOLESALE_STATUS_VIEWS.map(view => ({ ...view, count: view.value && counts?.[view.value] }))

  return (
    <IndexFilters
      views={<ViewTabs label="Estado" options={views} value={query.status} onChange={status => update({ status })} />}
      search={{
        value: query.q ?? '',
        onSearch: q => update({ q: q || undefined }),
        placeholder: 'Buscá por empresa, CUIT o email',
        label: 'Buscar clientes frecuentes',
      }}
      hasFilters={hasSearch}
      onClearAll={() => update({ q: undefined })}
    />
  )
}
