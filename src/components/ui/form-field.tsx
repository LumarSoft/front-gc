import { Field, FieldDescription, FieldError, FieldLabel } from '@/src/components/ui/field'

type FormFieldProps = {
  /** Id of the control inside, so the label points to it. */
  id: string
  label: React.ReactNode
  /** Validation error of the control (e.g. react-hook-form's `errors.email`). */
  error?: { message?: string }
  description?: React.ReactNode
  /** Element shown next to the label, e.g. a "¿La olvidaste?" link. */
  labelAction?: React.ReactNode
  children: React.ReactNode
}

/** Label + control + help text + error, with the invalid state wired for styles and screen readers. */
export function FormField({ id, label, error, description, labelAction, children }: FormFieldProps) {
  const labelElement = <FieldLabel htmlFor={id}>{label}</FieldLabel>

  return (
    <Field data-invalid={Boolean(error)}>
      {labelAction ? (
        <div className="flex items-center justify-between">
          {labelElement}
          {labelAction}
        </div>
      ) : (
        labelElement
      )}
      {children}
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError errors={[error]} />
    </Field>
  )
}
