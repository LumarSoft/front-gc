'use client'

import { PlusIcon, TrademarkIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { EmptyState } from '@/src/components/ui/empty-state'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { BrandFormDialog } from '@/src/features/admin/components/brands/brand-form-dialog'
import { BrandRow } from '@/src/features/admin/components/brands/brand-row'
import { ArchiveConfirmDialog } from '@/src/features/admin/components/common/archive-confirm-dialog'
import { ListCard } from '@/src/features/admin/components/common/list-card'
import { ListFilters } from '@/src/features/admin/components/common/list-filters'
import { NoMatches } from '@/src/features/admin/components/common/no-matches'
import { useAdminBrands } from '@/src/features/admin/hooks/use-admin-brands'
import { useArchiveConfirm } from '@/src/features/admin/hooks/use-archive-confirm'
import { useBrandHandlers } from '@/src/features/admin/hooks/use-brand-handlers'
import { useEditorState } from '@/src/features/admin/hooks/use-editor-state'
import { useListFilter } from '@/src/features/admin/hooks/use-list-filter'
import { brandArchiveBlocker } from '@/src/features/admin/lib/brand-form'
import { filterByVisibility, type VisibilityView, visibilityCounts } from '@/src/features/admin/lib/taxonomy-filter'
import type { AdminBrand } from '@/src/types/api/admin-catalog'

export function BrandsView() {
  const { data: brands = [], isPending, isError, refetch } = useAdminBrands()
  const editor = useEditorState<AdminBrand>()
  const archiveConfirm = useArchiveConfirm<AdminBrand>()
  const { handlers, archive } = useBrandHandlers({ brands, edit: editor.openEdit, askArchive: archiveConfirm.ask })
  const createButton = (
    <Button onClick={() => editor.openCreate(undefined)}>
      <PlusIcon />
      Nueva marca
    </Button>
  )
  const { state } = editor
  const filter = useListFilter<VisibilityView>()
  const shown = filterByVisibility(brands, filter.view, filter.term)
  const counts = visibilityCounts(brands)

  return (
    <>
      <AdminPageHeader
        title="Marcas"
        description="Las marcas que vende la tienda. El orden es el de los filtros del catálogo."
        actions={createButton}
      />
      <ListCard
        toolbar={
          brands.length > 0 && (
            <ListFilters
              label="Marcas"
              views={[
                { value: undefined, label: 'Todas' },
                { value: 'active', label: 'Activas', count: counts.active },
                { value: 'inactive', label: 'Inactivas', count: counts.inactive },
              ]}
              view={filter.view}
              onViewChange={filter.setView}
              term={filter.term}
              onTermChange={filter.setTerm}
              placeholder="Buscá por nombre"
            />
          )
        }
        isPending={isPending}
        isError={isError}
        onRetry={() => void refetch()}
        isEmpty={shown.length === 0}
        empty={
          filter.filtered ? (
            <NoMatches icon={TrademarkIcon} title="Ninguna marca coincide" onClear={filter.clear} />
          ) : (
            <EmptyState
              icon={<TrademarkIcon />}
              title="Todavía no hay marcas"
              description="Agregá las marcas que vendés para poder asignarlas a los productos."
              action={createButton}
            />
          )
        }
      >
        <ul className="divide-y">
          {shown.map((brand, index) => (
            <BrandRow
              key={brand.id}
              brand={brand}
              index={index}
              total={shown.length}
              reorderable={!filter.filtered}
              handlers={handlers}
            />
          ))}
        </ul>
      </ListCard>
      <BrandFormDialog
        open={state.open}
        onOpenChange={open => !open && editor.close()}
        brand={state.open && state.mode === 'edit' ? state.item : null}
      />
      <ArchiveConfirmDialog
        name={archiveConfirm.target?.name ?? null}
        blocker={archiveConfirm.target ? brandArchiveBlocker(archiveConfirm.target) : null}
        consequence="Deja de aparecer en los filtros y en este listado."
        onConfirm={() => archiveConfirm.target && archive(archiveConfirm.target)}
        onDismiss={archiveConfirm.dismiss}
      />
    </>
  )
}
