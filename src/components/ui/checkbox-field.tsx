'use client'

import { Checkbox } from '@/src/components/ui/checkbox'
import { Field, FieldLabel } from '@/src/components/ui/field'

type CheckboxFieldProps = {
  id: string
  label: React.ReactNode
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

/** Checkbox with its clickable label, as a controlled boolean (no "indeterminate"). */
export function CheckboxField({ id, label, checked, onCheckedChange }: CheckboxFieldProps) {
  return (
    <Field orientation="horizontal">
      <Checkbox id={id} checked={checked} onCheckedChange={value => onCheckedChange(value === true)} />
      <FieldLabel htmlFor={id} className="font-normal">
        {label}
      </FieldLabel>
    </Field>
  )
}
