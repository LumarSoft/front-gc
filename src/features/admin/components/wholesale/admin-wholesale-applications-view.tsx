'use client'

import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { formatCuit } from '@/src/features/wholesale/lib/cuit'
import { WHOLESALE_STATUS_LABEL } from '@/src/features/wholesale/lib/wholesale-labels'
import { formatDateTime } from '@/src/lib/format'
import type { WholesaleStatus } from '@/src/types/api/auth'
import { AdminPageHeader } from '../admin-page-header'
import { ListPagination } from '../common/list-pagination'
import { ListSkeleton } from '../common/list-skeleton'
import { useAdminWholesaleApplications } from '../../hooks/use-admin-wholesale'

export function AdminWholesaleApplicationsView() {
  const { query, status, filter, setPage } = useAdminWholesaleApplications()
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Clientes frecuentes"
        description="Solicitudes de cuenta. Al aprobar, la empresa compra con su lista de precios."
      />
      <div>
        <label htmlFor="wholesale-status-filter" className="mr-3 text-sm font-medium">
          Estado
        </label>
        <select
          id="wholesale-status-filter"
          value={status}
          onChange={event => filter(event.target.value as WholesaleStatus | '')}
          className="h-10 rounded-lg border bg-background px-3 text-sm"
        >
          <option value="">Todas</option>
          {Object.entries(WHOLESALE_STATUS_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      {query.isError && (
        <div role="alert">
          <p>No pudimos cargar las solicitudes.</p>
          <Button className="mt-3" onClick={() => void query.refetch()}>
            Reintentar
          </Button>
        </div>
      )}
      <div className="overflow-hidden rounded-2xl border bg-card">
        {query.isPending && <ListSkeleton rows={4} />}
        {query.data && !query.data.items.length && (
          <p className="p-8 text-center text-muted-foreground">No hay solicitudes con este estado.</p>
        )}
        {query.data && (
          <>
            <ul className="divide-y">
              {query.data.items.map(item => (
                <li key={item.id}>
                  <Link
                    href={`/admin/clientes-frecuentes/${item.id}`}
                    className="flex flex-col gap-2 p-5 transition-colors hover:bg-muted sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-bold">{item.company.legalName}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        CUIT {formatCuit(item.company.cuit)} · {item.submittedBy.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{formatDateTime(item.createdAt)}</p>
                    </div>
                    <span className="self-start rounded-full bg-muted px-3 py-1 text-xs font-semibold sm:self-center">
                      {WHOLESALE_STATUS_LABEL[item.status]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <ListPagination {...query.data} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  )
}
