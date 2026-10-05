'use client'

import { type DefaultValues, type FieldValues, type Resolver, useForm } from 'react-hook-form'

type UseSectionFormOptions<TValues extends FieldValues> = {
  /** Current saved values: the form follows them, so it is clean again after each save. */
  values: TValues
  resolver: Resolver<TValues>
  onSave: (values: TValues) => void
  pending: boolean
}

/** A form section that saves on its own (EditorSection): dirty flag, save and discard. */
export function useSectionForm<TValues extends FieldValues>({
  values,
  resolver,
  onSave,
  pending,
}: UseSectionFormOptions<TValues>) {
  const form = useForm<TValues>({ resolver, defaultValues: values as DefaultValues<TValues>, values })
  return {
    form,
    dirty: form.formState.isDirty,
    pending,
    save: form.handleSubmit(onSave),
    discard: () => form.reset(values),
  }
}
