'use client'

import { Field, FieldContent, FieldDescription, FieldLabel } from '@/src/components/ui/field'
import { Switch } from '@/src/components/ui/switch'

type SwitchFieldProps = {
  id: string
  label: string
  description?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

/** On/off setting with its label and a line explaining what it changes. */
export function SwitchField({ id, label, description, checked, onCheckedChange }: SwitchFieldProps) {
  return (
    <Field orientation="horizontal" className="items-start justify-between gap-4 rounded-lg border p-3">
      <FieldContent>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </Field>
  )
}
