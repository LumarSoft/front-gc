'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCategoryMutations } from '@/src/features/admin/hooks/use-category-mutations'
import {
  categoryFormDefaults,
  categoryFormSchema,
  type CategoryFormValues,
  toCategoryInput,
} from '@/src/features/admin/lib/category-form'
import type { AdminCategory } from '@/src/types/api/admin-catalog'

type UseCategoryFormOptions = {
  open: boolean
  /** Null when creating. */
  category: AdminCategory | null
  /** Preset parent when creating a subcategory. */
  parentId: number | null
  onSaved: () => void
}

/** Form state for the category dialog: defaults, validation and save (create or update). */
export function useCategoryForm({ open, category, parentId, onSaved }: UseCategoryFormOptions) {
  const { create, update } = useCategoryMutations()
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: categoryFormDefaults(category, parentId),
  })

  // The dialog stays mounted between openings: start from fresh values every time it opens.
  useEffect(() => {
    if (open) form.reset(categoryFormDefaults(category, parentId))
  }, [form, open, category, parentId])

  const onSubmit = form.handleSubmit(values => {
    const input = toCategoryInput(values)
    if (category) update.mutate({ id: category.id, input }, { onSuccess: onSaved })
    else create.mutate(input, { onSuccess: onSaved })
  })

  return { form, onSubmit, isSaving: create.isPending || update.isPending }
}
