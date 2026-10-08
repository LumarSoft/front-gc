'use client'

import { PlusIcon, TagIcon } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { EmptyState } from '@/src/components/ui/empty-state'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { ArchiveConfirmDialog } from '@/src/features/admin/components/common/archive-confirm-dialog'
import { ListCard } from '@/src/features/admin/components/common/list-card'
import { ListFilters } from '@/src/features/admin/components/common/list-filters'
import { NoMatches } from '@/src/features/admin/components/common/no-matches'
import { TagFormDialog } from '@/src/features/admin/components/tags/tag-form-dialog'
import { TagGroupSection } from '@/src/features/admin/components/tags/tag-group-section'
import { useAdminTags } from '@/src/features/admin/hooks/use-admin-tags'
import { useArchiveConfirm } from '@/src/features/admin/hooks/use-archive-confirm'
import { useEditorState } from '@/src/features/admin/hooks/use-editor-state'
import { useListFilter } from '@/src/features/admin/hooks/use-list-filter'
import { useTagMutations } from '@/src/features/admin/hooks/use-tag-mutations'
import { filterTagGroups } from '@/src/features/admin/lib/taxonomy-filter'
import { groupLabel, groupTags } from '@/src/features/admin/lib/tag-form'
import type { AdminTag } from '@/src/types/api/admin-catalog'

export function TagsView() {
  const { data: tags = [], isPending, isError, refetch } = useAdminTags()
  const editor = useEditorState<AdminTag, { group: string | null }>()
  const archiveConfirm = useArchiveConfirm<AdminTag>()
  const { archive } = useTagMutations()
  const groups = groupTags(tags)
  const filter = useListFilter<string>()
  const shown = filterTagGroups(groups, filter.view, filter.term)
  const createButton = (
    <Button onClick={() => editor.openCreate({ group: null })}>
      <PlusIcon />
      Nueva etiqueta
    </Button>
  )
  const { state } = editor
  const target = archiveConfirm.target

  return (
    <>
      <AdminPageHeader
        title="Etiquetas"
        description="Clasifican productos para los filtros del catálogo y el asistente, por ejemplo por uso."
        actions={createButton}
      />
      <ListCard
        toolbar={
          groups.length > 0 && (
            <ListFilters
              label="Etiquetas"
              views={[
                { value: undefined, label: 'Todas' },
                ...groups.map(group => ({
                  value: group.group ?? '',
                  label: groupLabel(group.group),
                  count: group.tags.length,
                })),
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
            <NoMatches icon={TagIcon} title="Ninguna etiqueta coincide" onClear={filter.clear} />
          ) : (
            <EmptyState
              icon={<TagIcon />}
              title="Todavía no hay etiquetas"
              description="Creá etiquetas en el grupo «uso» (Hogar, Oficina…) para sumar filtros por uso al catálogo."
              action={createButton}
            />
          )
        }
      >
        {shown.map(group => (
          <TagGroupSection
            key={group.group ?? 'none'}
            group={group}
            onAdd={groupName => editor.openCreate({ group: groupName })}
            onEdit={editor.openEdit}
            onArchive={archiveConfirm.ask}
          />
        ))}
      </ListCard>
      <TagFormDialog
        open={state.open}
        onOpenChange={open => !open && editor.close()}
        tag={state.open && state.mode === 'edit' ? state.item : null}
        group={state.open && state.mode === 'create' ? state.draft.group : null}
        groups={groups.flatMap(group => (group.group ? [group.group] : []))}
      />
      <ArchiveConfirmDialog
        name={target?.name ?? null}
        blocker={null}
        consequence={
          target && target.productCount > 0
            ? `Se quita de ${target.productCount} ${target.productCount === 1 ? 'producto' : 'productos'} y deja de aparecer en los filtros.`
            : 'Deja de aparecer en los filtros.'
        }
        onConfirm={() => target && archive.mutate(target)}
        onDismiss={archiveConfirm.dismiss}
      />
    </>
  )
}
