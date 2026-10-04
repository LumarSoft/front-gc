'use client'

import { PlusIcon, TrademarkIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { EmptyState } from '@/src/components/ui/empty-state'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { BrandFormDialog } from '@/src/features/admin/components/brands/brand-form-dialog'
import { BrandRow } from '@/src/features/admin/components/brands/brand-row'
import { ArchiveConfirmDialog } from '@/src/features/admin/components/common/archive-confirm-dialog'
import { ListCard } from '@/src/features/admin/components/common/list-card'
import { useAdminBrands } from '@/src/features/admin/hooks/use-admin-brands'
import { useArchiveConfirm } from '@/src/features/admin/hooks/use-archive-confirm'
import { useBrandHandlers } from '@/src/features/admin/hooks/use-brand-handlers'
import { useEditorState } from '@/src/features/admin/hooks/use-editor-state'
import { brandArchiveBlocker } from '@/src/features/admin/lib/brand-form'
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

  return (
    <>
      <AdminPageHeader
        title="Marcas"
        description="Las marcas que vende la tienda. El orden es el de los filtros del catálogo."
        actions={createButton}
      />
      <ListCard
        isPending={isPending}
        isError={isError}
        onRetry={() => void refetch()}
        isEmpty={brands.length === 0}
        empty={
          <EmptyState
            icon={<TrademarkIcon />}
            title="Todavía no hay marcas"
            description="Agregá las marcas que vendés para poder asignarlas a los productos."
            action={createButton}
          />
        }
      >
        <ul className="divide-y">
          {brands.map((brand, index) => (
            <BrandRow key={brand.id} brand={brand} index={index} total={brands.length} handlers={handlers} />
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
