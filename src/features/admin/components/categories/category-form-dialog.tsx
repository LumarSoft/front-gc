'use client'

import { Controller } from 'react-hook-form'
import { FieldGroup } from '@/src/components/ui/field'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import { SwitchField } from '@/src/components/ui/switch-field'
import { Textarea } from '@/src/components/ui/textarea'
import { CategoryParentSelect } from '@/src/features/admin/components/categories/category-parent-select'
import { FormDialog } from '@/src/features/admin/components/common/form-dialog'
import { ImageUploadField } from '@/src/features/admin/components/common/image-upload-field'
import { SlugField } from '@/src/features/admin/components/common/slug-field'
import { useCategoryForm } from '@/src/features/admin/hooks/use-category-form'
import { NO_PARENT } from '@/src/features/admin/lib/category-form'
import type { AdminCategory } from '@/src/types/api/admin-catalog'

type CategoryFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Null when creating. */
  category: AdminCategory | null
  parentId: number | null
  /** Top-level categories, for the parent picker. */
  topLevel: AdminCategory[]
}

export function CategoryFormDialog({ open, onOpenChange, category, parentId, topLevel }: CategoryFormDialogProps) {
  const { form, onSubmit, isSaving } = useCategoryForm({
    open,
    category,
    parentId,
    onSaved: () => onOpenChange(false),
  })
  const { errors } = form.formState
  const hasChildren = (category?.children.length ?? 0) > 0
  const isSubcategory = form.watch('parentId') !== NO_PARENT

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={category ? `Editar «${category.name}»` : isSubcategory ? 'Nueva subcategoría' : 'Nueva categoría'}
      description="Las categorías activas aparecen en el menú de la tienda."
      submitLabel={category ? 'Guardar cambios' : 'Crear'}
      pending={isSaving}
      onSubmit={onSubmit}
    >
      <FieldGroup className="gap-5">
        <FormField id="category-name" label="Nombre" error={errors.name}>
          <Input id="category-name" autoFocus aria-invalid={!!errors.name} {...form.register('name')} />
        </FormField>
        <FormField
          id="category-parent"
          label="Categoría principal"
          description={hasChildren ? 'Tiene subcategorías, así que tiene que seguir siendo principal.' : undefined}
        >
          <Controller
            control={form.control}
            name="parentId"
            render={({ field }) => (
              <CategoryParentSelect
                id="category-parent"
                value={field.value}
                onChange={field.onChange}
                options={topLevel.filter(option => option.id !== category?.id)}
                disabled={hasChildren}
              />
            )}
          />
        </FormField>
        <SlugField
          id="category-slug"
          registration={form.register('slug')}
          name={form.watch('name')}
          value={form.watch('slug')}
          error={errors.slug}
          pathPrefix="/categorias/"
        />
        <FormField id="category-description" label="Descripción" error={errors.description} description="Opcional.">
          <Textarea id="category-description" rows={3} {...form.register('description')} />
        </FormField>
        <Controller
          control={form.control}
          name="image"
          render={({ field }) => (
            <ImageUploadField id="category-image" label="Imagen" value={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <SwitchField
              id="category-active"
              label="Visible en la tienda"
              description="Si la desactivás, deja de aparecer en el menú. No se borra nada."
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </FieldGroup>
    </FormDialog>
  )
}
