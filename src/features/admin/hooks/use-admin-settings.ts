'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAdminMutation } from '@/src/features/admin/hooks/use-admin-mutation'
import type { SaveSection } from '@/src/features/admin/hooks/use-save-bar'
import { prepareForm } from '@/src/features/admin/lib/form-submit'
import {
  localDeliverySchema,
  localDeliveryValues,
  reservationSchema,
  reservationValues,
  toLocalDeliveryInput,
  toReservationInput,
} from '@/src/features/admin/lib/settings-forms'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { getAdminSettings, updateLocalDelivery, updateReservation } from '@/src/services/admin-settings.service'
import type { AdminSettings } from '@/src/types/api/admin-settings'

export function useAdminSettings() {
  return useQuery({ queryKey: QUERY_KEYS.admin.settings, queryFn: getAdminSettings })
}

/** Stores the saved settings so every form follows them (clean again after saving). No toast: the save bar confirms. */
function useSettingsMutation<TInput>(mutationFn: (input: TInput) => Promise<AdminSettings>) {
  const queryClient = useQueryClient()
  return useAdminMutation({
    mutationFn,
    invalidate: [QUERY_KEYS.admin.dashboard],
    onSuccess: settings => queryClient.setQueryData(QUERY_KEYS.admin.settings, settings),
  })
}

/** Rosario delivery: on/off, rate and free-shipping amount, saved through the page's save bar. */
export function useLocalDeliveryForm(settings: AdminSettings) {
  const mutation = useSettingsMutation(updateLocalDelivery)
  const values = localDeliveryValues(settings)
  const form = useForm({ resolver: zodResolver(localDeliverySchema), defaultValues: values, values })
  const section: SaveSection = {
    dirty: form.formState.isDirty,
    prepare: () => prepareForm(form, formValues => mutation.mutateAsync(toLocalDeliveryInput(formValues))),
    discard: () => form.reset(values),
  }
  return { form, section }
}

/** Hours a pending manual-payment order keeps its stock, saved through the page's save bar. */
export function useReservationForm(settings: AdminSettings) {
  const mutation = useSettingsMutation(updateReservation)
  const values = reservationValues(settings)
  const form = useForm({ resolver: zodResolver(reservationSchema), defaultValues: values, values })
  const section: SaveSection = {
    dirty: form.formState.isDirty,
    prepare: () => prepareForm(form, formValues => mutation.mutateAsync(toReservationInput(formValues))),
    discard: () => form.reset(values),
  }
  return { form, section }
}
