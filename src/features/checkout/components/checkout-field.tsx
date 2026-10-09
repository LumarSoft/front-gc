'use client'

import { useFormContext, type FieldPath } from 'react-hook-form'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import type { CheckoutValues } from '../lib/checkout-schema'

type Props = {
  name: FieldPath<CheckoutValues>
  label: string
  type?: 'text' | 'email' | 'tel'
  autoComplete: string
  description?: string
  inputMode?: 'text' | 'numeric' | 'tel'
}

export function CheckoutField({ name, label, type = 'text', autoComplete, description, inputMode }: Props) {
  const { register, getFieldState, formState } = useFormContext<CheckoutValues>()
  const { error } = getFieldState(name, formState)
  const id = `checkout-${name.replace('.', '-')}`
  return (
    <FormField id={id} label={label} error={error} description={description}>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        className="h-12 rounded-xl px-4"
        {...register(name)}
      />
    </FormField>
  )
}
