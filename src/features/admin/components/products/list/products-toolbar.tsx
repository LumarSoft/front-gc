'use client'

import { XIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { Label } from '@/src/components/ui/label'
import { Switch } from '@/src/components/ui/switch'
import { BrandSelect } from '@/src/features/admin/components/common/brand-select'
import { CategorySelect } from '@/src/features/admin/components/common/category-select'
import { SearchInput } from '@/src/features/admin/components/common/search-input'
import { StatusTabs } from '@/src/features/admin/components/products/list/status-tabs'
import { useProductListParams } from '@/src/features/admin/hooks/use-product-list-params'

/** Search and filters of the product list. Everything is kept in the URL. */
export function ProductsToolbar() {
  const { query, update, clear, hasFilters } = useProductListParams()

  return (
    <div className="mb-4 flex flex-col gap-3">
      <StatusTabs value={query.status} onChange={status => update({ status })} />
      <div className="grid gap-2 sm:grid-cols-2 lg:flex lg:items-center">
        <div className="sm:col-span-2 lg:w-80">
          <SearchInput
            label="Buscar productos"
            placeholder="Buscá por nombre o SKU"
            value={query.q ?? ''}
            onSearch={q => update({ q: q || undefined })}
          />
        </div>
        <CategorySelect
          value={query.categoryId}
          onChange={categoryId => update({ categoryId })}
          emptyLabel="Todas las categorías"
          className="bg-background lg:w-52"
        />
        <BrandSelect
          value={query.brandId}
          onChange={brandId => update({ brandId: brandId ?? undefined })}
          emptyLabel="Todas las marcas"
          className="bg-background lg:w-44"
        />
        <div className="flex items-center gap-2 py-1 lg:px-2">
          <Switch
            id="products-out-of-stock"
            checked={query.stock === 'out'}
            onCheckedChange={checked => update({ stock: checked ? 'out' : undefined })}
          />
          <Label htmlFor="products-out-of-stock" className="font-normal">
            Solo sin stock
          </Label>
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clear} className="justify-self-start lg:ml-auto">
            <XIcon />
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  )
}
