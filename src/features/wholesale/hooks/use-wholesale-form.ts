'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { AuthUser } from '@/src/types/api/auth'
import type { CreateWholesaleApplicationRequest, WholesaleApplication } from '@/src/types/api/wholesale'
import { formatCuit } from '../lib/cuit'
import { wholesaleApplicationSchema, type WholesaleApplicationValues } from '../lib/wholesale-schema'

/** Prefilled with the previous application when re-applying after a rejection, else with the account's email. */
export function useWholesaleForm(
  user: AuthUser,
  previous: WholesaleApplication | null,
  onSubmit: (input: CreateWholesaleApplicationRequest) => void,
) {
  const company = previous?.company
  const form = useForm<WholesaleApplicationValues>({
    resolver: zodResolver(wholesaleApplicationSchema),
    defaultValues: {
      legalName: company?.legalName ?? '',
      tradeName: company?.tradeName ?? '',
      cuit: company ? formatCuit(company.cuit) : '',
      taxCondition:
        company && company.taxCondition !== 'CONSUMIDOR_FINAL' && company.taxCondition !== 'NO_RESPONSABLE'
          ? company.taxCondition
          : undefined,
      email: company?.email ?? user.email,
      phone: company?.phone ?? user.phone ?? '',
      message: previous?.message ?? '',
    },
  })
  const submit = form.handleSubmit(({ tradeName, phone, message, ...values }) =>
    onSubmit({
      ...values,
      tradeName: tradeName || undefined,
      phone: phone || undefined,
      message: message || undefined,
    }),
  )
  return { form, submit }
}
