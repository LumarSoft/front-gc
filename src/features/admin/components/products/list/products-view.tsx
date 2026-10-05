'use client'

import { useState } from 'react'
import { PackageIcon, PlusIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { EmptyState } from '@/src/components/ui/empty-state'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { ListCard } from '@/src/features/admin/components/common/list-card'
import { ListPagination } from '@/src/features/admin/components/common/list-pagination'
import { CreateProductDialog } from '@/src/features/admin/components/products/list/create-product-dialog'
import { ProductsMobileList } from '@/src/features/admin/components/products/list/products-mobile-list'
import { ProductsTable } from '@/src/features/admin/components/products/list/products-table'
import { ProductsToolbar } from '@/src/features/admin/components/products/list/products-toolbar'
import { useAdminProducts } from '@/src/features/admin/hooks/use-admin-products'
import { useProductListParams } from '@/src/features/admin/hooks/use-product-list-params'
import { cn } from '@/src/lib/utils'

export function ProductsView() {
  const { query, update, clear, hasFilters } = useProductListParams()
  const { data, isPending, isError, isPlaceholderData, refetch } = useAdminProducts(query)
  const [creating, setCreating] = useState(false)
  const createButton = (
    <Button onClick={() => setCreating(true)}>
      <PlusIcon />
      Nuevo producto
    </Button>
  )
  const items = data?.items ?? []

  return (
    <>
      <AdminPageHeader
        title="Productos"
        description={data ? `${data.total} ${data.total === 1 ? 'producto' : 'productos'} en el catálogo.` : undefined}
        actions={createButton}
      />
      <ProductsToolbar />
      <ListCard
        isPending={isPending}
        isError={isError}
        onRetry={() => void refetch()}
        isEmpty={items.length === 0}
        empty={
          hasFilters ? (
            <EmptyState
              icon={<PackageIcon />}
              title="Ningún producto coincide"
              description="Probá con otra búsqueda o quitá algún filtro."
              action={
                <Button variant="outline" onClick={clear}>
                  Limpiar filtros
                </Button>
              }
            />
          ) : (
            <EmptyState
              icon={<PackageIcon />}
              title="Todavía no hay productos"
              description="Creá el primero: se guarda como borrador hasta que lo publiques."
              action={createButton}
            />
          )
        }
      >
        {/* While another page loads, the current one fades instead of jumping to a skeleton. */}
        <div className={cn('transition-opacity', isPlaceholderData && 'opacity-60')}>
          <ProductsTable products={items} />
          <ProductsMobileList products={items} />
          {data && <ListPagination {...data} onPageChange={page => update({ page })} />}
        </div>
      </ListCard>
      <CreateProductDialog open={creating} onOpenChange={setCreating} />
    </>
  )
}
