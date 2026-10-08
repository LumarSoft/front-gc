'use client'

import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/src/components/ui/dropdown-menu'
import { FilterPill } from '@/src/features/admin/components/common/filter-pill'
import { IndexFilters } from '@/src/features/admin/components/common/index-filters'
import { SortMenu } from '@/src/features/admin/components/common/sort-menu'
import { ToggleFilterPill } from '@/src/features/admin/components/common/toggle-filter-pill'
import { ViewTabs } from '@/src/features/admin/components/common/view-tabs'
import { useAdminBrands } from '@/src/features/admin/hooks/use-admin-brands'
import { useAdminCategories } from '@/src/features/admin/hooks/use-admin-categories'
import { useProductListParams } from '@/src/features/admin/hooks/use-product-list-params'
import { categoryOptions } from '@/src/features/admin/lib/category-options'
import { PRODUCT_SORT_OPTIONS, PRODUCT_STATUS_VIEWS } from '@/src/features/admin/lib/product-labels'
import { cn } from '@/src/lib/utils'

/** Views, search, filter pills and order of the product list. Everything is kept in the URL. */
export function ProductsFilters() {
  const { query, update, clearSearch, hasSearch } = useProductListParams()
  const categories = categoryOptions(useAdminCategories().data ?? [])
  const brands = useAdminBrands().data ?? []

  return (
    <IndexFilters
      views={
        <ViewTabs
          label="Estado"
          options={PRODUCT_STATUS_VIEWS}
          value={query.status}
          onChange={status => update({ status })}
        />
      }
      search={{
        value: query.q ?? '',
        onSearch: q => update({ q: q || undefined }),
        placeholder: 'Buscá por nombre o SKU',
        label: 'Buscar productos',
      }}
      hasFilters={hasSearch}
      onClearAll={clearSearch}
      sort={
        <SortMenu options={PRODUCT_SORT_OPTIONS} value={query.sort ?? 'updated'} onChange={sort => update({ sort })} />
      }
      filters={
        <>
          <FilterPill
            label="Categoría"
            valueLabel={categories.find(option => option.id === query.categoryId)?.label}
            onClear={() => update({ categoryId: undefined })}
          >
            <DropdownMenuRadioGroup
              value={query.categoryId ? String(query.categoryId) : ''}
              onValueChange={id => update({ categoryId: Number(id) })}
            >
              {categories.map(option => (
                <DropdownMenuRadioItem
                  key={option.id}
                  value={String(option.id)}
                  className={cn(option.isChild && 'pl-8')}
                >
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </FilterPill>
          <FilterPill
            label="Marca"
            valueLabel={brands.find(brand => brand.id === query.brandId)?.name}
            onClear={() => update({ brandId: undefined })}
          >
            <DropdownMenuRadioGroup
              value={query.brandId ? String(query.brandId) : ''}
              onValueChange={id => update({ brandId: Number(id) })}
            >
              {brands.map(brand => (
                <DropdownMenuRadioItem key={brand.id} value={String(brand.id)}>
                  {brand.name}
                  {!brand.isActive && ' (inactiva)'}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </FilterPill>
          <ToggleFilterPill
            label="Sin stock"
            pressed={query.stock === 'out'}
            onPressedChange={pressed => update({ stock: pressed ? 'out' : undefined })}
          />
        </>
      }
    />
  )
}
