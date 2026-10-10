'use client'

import { useFormContext, type FieldPath } from 'react-hook-form'
import { FloatingInput, FloatingSelect } from '@/src/components/ui/floating-field'
import { ARGENTINE_PROVINCES } from '../lib/argentine-provinces'
import type { CheckoutValues } from '../lib/checkout-schema'

type CheckoutInputProps = {
  name: FieldPath<CheckoutValues>
  label: string
  autoComplete: string
  type?: 'text' | 'email' | 'tel'
  inputMode?: 'text' | 'numeric' | 'tel' | 'email'
  grouped?: boolean
}

const fieldId = (name: string): string => `checkout-${name.replace('.', '-')}`

/** A checkout field bound to the form. Its error is listed under the field or the group it belongs to. */
export function CheckoutInput({
  name,
  label,
  autoComplete,
  type = 'text',
  inputMode,
  grouped = true,
}: CheckoutInputProps) {
  const { register, getFieldState, formState } = useFormContext<CheckoutValues>()
  const { error } = getFieldState(name, formState)
  return (
    <FloatingInput
      id={fieldId(name)}
      label={label}
      type={type}
      inputMode={inputMode}
      autoComplete={autoComplete}
      grouped={grouped}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${fieldId(name)}-error` : undefined}
      {...register(name)}
    />
  )
}

/** Province as a native select: no misspelled provinces the carrier would reject. */
export function ProvinceInput() {
  const { register, getFieldState, formState } = useFormContext<CheckoutValues>()
  const name = 'shippingAddress.province'
  const { error } = getFieldState(name, formState)
  return (
    <FloatingSelect
      id={fieldId(name)}
      label="Provincia"
      grouped
      autoComplete="address-level1"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${fieldId(name)}-error` : undefined}
      {...register(name)}
    >
      <option value="">Elegí la provincia</option>
      {ARGENTINE_PROVINCES.map(province => (
        <option key={province} value={province}>
          {province}
        </option>
      ))}
    </FloatingSelect>
  )
}

/**
 * Errors of the given fields, each one linked to its field for screen readers. More than two at once (an empty
 * address) read as one line on screen: the fields are already marked in red.
 */
export function CheckoutFieldErrors({ names }: { names: FieldPath<CheckoutValues>[] }) {
  const { getFieldState, formState } = useFormContext<CheckoutValues>()
  const errors = names
    .map(name => ({ name, message: getFieldState(name, formState).error?.message }))
    .filter((entry): entry is { name: FieldPath<CheckoutValues>; message: string } => Boolean(entry.message))
  if (!errors.length) return null
  const many = errors.length > 2
  return (
    <div className="mt-2 text-sm text-destructive">
      {many && <p aria-hidden>Completá los campos marcados en rojo.</p>}
      <ul className={many ? 'sr-only' : 'space-y-1'}>
        {errors.map(error => (
          <li key={error.name} id={`${fieldId(error.name)}-error`}>
            {error.message}
          </li>
        ))}
      </ul>
    </div>
  )
}
