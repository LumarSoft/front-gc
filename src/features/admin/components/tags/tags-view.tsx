'use client'

import { PlusIcon, TagIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { EmptyState } from '@/src/components/ui/empty-state'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { ArchiveConfirmDialog } from '@/src/features/admin/components/common/archive-confirm-dialog'
import { ListCard } from '@/src/features/admin/components/common/list-card'
import { TagFormDialog } from '@/src/features/admin/components/tags/tag-form-dialog'
import { TagGroupCard } from '@/src/features/admin/components/tags/tag-group-card'
import { useAdminTags } from '@/src/features/admin/hooks/use-admin-tags'
import { useArchiveConfirm } from '@/src/features/admin/hooks/use-archive-confirm'
import { useEditorState } from '@/src/features/admin/hooks/use-editor-state'
import { useTagMutations } from '@/src/features/admin/hooks/use-tag-mutations'
import { groupTags } from '@/src/features/admin/lib/tag-form'
import type { AdminTag } from '@/src/types/api/admin-catalog'

export function TagsView() {
  const { data: tags = [], isPending, isError, refetch } = useAdminTags()
  const editor = useEditorState<AdminTag, { group: string | null }>()
  const archiveConfirm = useArchiveConfirm<AdminTag>()
  const { archive } = useTagMutations()
  const groups = groupTags(tags)
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
      {isPending || isError || groups.length === 0 ? (
        <ListCard
          isPending={isPending}
          isError={isError}
          onRetry={() => void refetch()}
          isEmpty
          empty={
            <EmptyState
              icon={<TagIcon />}
              title="Todavía no hay etiquetas"
              description="Creá etiquetas en el grupo «uso» (Hogar, Oficina…) para sumar filtros por uso al catálogo."
              action={createButton}
            />
          }
        />
      ) : (
        <div className="flex flex-col gap-4">
          {groups.map(group => (
            <TagGroupCard
              key={group.group ?? 'none'}
              group={group}
              onAdd={groupName => editor.openCreate({ group: groupName })}
              onEdit={editor.openEdit}
              onArchive={archiveConfirm.ask}
            />
          ))}
        </div>
      )}
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
