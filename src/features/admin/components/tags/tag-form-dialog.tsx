'use client'

import { FieldGroup } from '@/src/components/ui/field'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import { FormDialog } from '@/src/features/admin/components/common/form-dialog'
import { useTagForm } from '@/src/features/admin/hooks/use-tag-form'
import { previewTagSlug } from '@/src/features/admin/lib/tag-form'
import type { AdminTag } from '@/src/types/api/admin-catalog'

type TagFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Null when creating. */
  tag: AdminTag | null
  /** Preset group when creating from a group section. */
  group: string | null
  /** Existing groups, suggested while typing. */
  groups: string[]
}

export function TagFormDialog({ open, onOpenChange, tag, group, groups }: TagFormDialogProps) {
  const { form, onSubmit, isSaving } = useTagForm(open, tag, group, () => onOpenChange(false))
  const { errors } = form.formState
  const slugPreview = previewTagSlug({ name: form.watch('name'), group: form.watch('group') })

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={tag ? `Editar «${tag.name}»` : 'Nueva etiqueta'}
      description="Las etiquetas del grupo «uso» son los filtros por uso del catálogo."
      submitLabel={tag ? 'Guardar cambios' : 'Crear etiqueta'}
      pending={isSaving}
      onSubmit={onSubmit}
    >
      <FieldGroup className="gap-5">
        <FormField id="tag-name" label="Nombre" error={errors.name}>
          <Input id="tag-name" autoFocus aria-invalid={!!errors.name} {...form.register('name')} />
        </FormField>
        <FormField
          id="tag-group"
          label="Grupo"
          error={errors.group}
          description="Agrupa etiquetas del mismo tipo. Dejalo vacío para una etiqueta suelta."
        >
          <Input id="tag-group" list="tag-groups" aria-invalid={!!errors.group} {...form.register('group')} />
          <datalist id="tag-groups">
            {groups.map(item => (
              <option key={item} value={item} />
            ))}
          </datalist>
        </FormField>
        <FormField
          id="tag-slug"
          label="Identificador en los filtros"
          error={errors.slug}
          description={
            <>
              Se usa en la URL de los filtros (<span className="font-mono">?tag=…</span>). Si lo dejás vacío queda{' '}
              <span className="font-mono text-foreground">{slugPreview || '…'}</span>.
            </>
          }
        >
          <Input id="tag-slug" placeholder={slugPreview} aria-invalid={!!errors.slug} {...form.register('slug')} />
        </FormField>
      </FieldGroup>
    </FormDialog>
  )
}
