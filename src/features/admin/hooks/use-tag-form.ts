'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTagMutations } from '@/src/features/admin/hooks/use-tag-mutations'
import { tagFormDefaults, tagFormSchema, type TagFormValues, toTagInput } from '@/src/features/admin/lib/tag-form'
import type { AdminTag } from '@/src/types/api/admin-catalog'

/** Form state for the tag dialog: defaults, validation and save (create or update). */
export function useTagForm(open: boolean, tag: AdminTag | null, group: string | null, onSaved: () => void) {
  const { create, update } = useTagMutations()
  const form = useForm<TagFormValues>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: tagFormDefaults(tag, group),
  })

  // The dialog stays mounted between openings: start from fresh values every time it opens.
  useEffect(() => {
    if (open) form.reset(tagFormDefaults(tag, group))
  }, [form, open, tag, group])

  const onSubmit = form.handleSubmit(values => {
    const input = toTagInput(values)
    if (tag) update.mutate({ id: tag.id, input }, { onSuccess: onSaved })
    else create.mutate(input, { onSuccess: onSaved })
  })

  return { form, onSubmit, isSaving: create.isPending || update.isPending }
}
