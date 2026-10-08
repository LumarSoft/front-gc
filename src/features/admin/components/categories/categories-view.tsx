'use client'

import { FoldersIcon, PlusIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { EmptyState } from '@/src/components/ui/empty-state'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { CategoryFormDialog } from '@/src/features/admin/components/categories/category-form-dialog'
import { CategoryTree } from '@/src/features/admin/components/categories/category-tree'
import { ArchiveConfirmDialog } from '@/src/features/admin/components/common/archive-confirm-dialog'
import { ListCard } from '@/src/features/admin/components/common/list-card'
import { ListFilters } from '@/src/features/admin/components/common/list-filters'
import { NoMatches } from '@/src/features/admin/components/common/no-matches'
import { useAdminCategories } from '@/src/features/admin/hooks/use-admin-categories'
import { useArchiveConfirm } from '@/src/features/admin/hooks/use-archive-confirm'
import { useCategoryHandlers } from '@/src/features/admin/hooks/use-category-handlers'
import { useEditorState } from '@/src/features/admin/hooks/use-editor-state'
import { useListFilter } from '@/src/features/admin/hooks/use-list-filter'
import { categoryArchiveBlocker } from '@/src/features/admin/lib/category-form'
import { filterCategoryTree, type VisibilityView, visibilityCounts } from '@/src/features/admin/lib/taxonomy-filter'
import type { AdminCategory } from '@/src/types/api/admin-catalog'

export function CategoriesView() {
  const { data: categories = [], isPending, isError, refetch } = useAdminCategories()
  const editor = useEditorState<AdminCategory, { parentId: number | null }>()
  const archiveConfirm = useArchiveConfirm<AdminCategory>()
  const { handlers, archive } = useCategoryHandlers({
    categories,
    edit: editor.openEdit,
    addChild: parent => editor.openCreate({ parentId: parent.id }),
    askArchive: archiveConfirm.ask,
  })
  const createButton = (
    <Button onClick={() => editor.openCreate({ parentId: null })}>
      <PlusIcon />
      Nueva categoría
    </Button>
  )
  const { state } = editor
  const filter = useListFilter<VisibilityView>()
  const shown = filterCategoryTree(categories, filter.view, filter.term)
  const counts = visibilityCounts(categories.flatMap(category => [category, ...category.children]))

  return (
    <>
      <AdminPageHeader
        title="Categorías"
        description="Organizan el menú y los filtros de la tienda. Hasta dos niveles: categoría y subcategoría."
        actions={createButton}
      />
      <ListCard
        toolbar={
          categories.length > 0 && (
            <ListFilters
              label="Categorías"
              views={[
                { value: undefined, label: 'Todas' },
                { value: 'active', label: 'Visibles', count: counts.active },
                { value: 'inactive', label: 'Ocultas', count: counts.inactive },
              ]}
              view={filter.view}
              onViewChange={filter.setView}
              term={filter.term}
              onTermChange={filter.setTerm}
              placeholder="Buscá por nombre o URL"
            />
          )
        }
        isPending={isPending}
        isError={isError}
        onRetry={() => void refetch()}
        isEmpty={shown.length === 0}
        empty={
          filter.filtered ? (
            <NoMatches icon={FoldersIcon} title="Ninguna categoría coincide" onClear={filter.clear} />
          ) : (
            <EmptyState
              icon={<FoldersIcon />}
              title="Todavía no hay categorías"
              description="Creá la primera para empezar a ordenar los productos de la tienda."
              action={createButton}
            />
          )
        }
      >
        <CategoryTree categories={shown} reorderable={!filter.filtered} handlers={handlers} />
      </ListCard>
      <CategoryFormDialog
        open={state.open}
        onOpenChange={open => !open && editor.close()}
        category={state.open && state.mode === 'edit' ? state.item : null}
        parentId={state.open && state.mode === 'create' ? state.draft.parentId : null}
        topLevel={categories}
      />
      <ArchiveConfirmDialog
        name={archiveConfirm.target?.name ?? null}
        blocker={archiveConfirm.target ? categoryArchiveBlocker(archiveConfirm.target) : null}
        consequence="Deja de aparecer en la tienda y en este listado."
        onConfirm={() => archiveConfirm.target && archive(archiveConfirm.target)}
        onDismiss={archiveConfirm.dismiss}
      />
    </>
  )
}
