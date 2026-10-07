'use client'

import { useFormContext, type FieldPath } from 'react-hook-form'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import type { WholesaleApplicationValues } from '../lib/wholesale-schema'

type Props = {
  name: FieldPath<WholesaleApplicationValues>
  label: string
  type?: 'text' | 'email' | 'tel'
  autoComplete?: string
  inputMode?: 'numeric' | 'text'
  description?: string
  multiline?: boolean
}

export function WholesaleTextField({
  name,
  label,
  type = 'text',
  autoComplete,
  inputMode,
  description,
  multiline,
}: Props) {
  const { register, getFieldState, formState } = useFormContext<WholesaleApplicationValues>()
  const { error } = getFieldState(name, formState)
  const id = `wholesale-${name}`
  const shared = { id, 'aria-invalid': Boolean(error), ...register(name) }
  return (
    <FormField id={id} label={label} error={error} description={description}>
      {multiline ? (
        <Textarea rows={4} className="rounded-xl px-4 py-3" {...shared} />
      ) : (
        <Input
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className="h-12 rounded-xl px-4"
          {...shared}
        />
      )}
    </FormField>
  )
}
