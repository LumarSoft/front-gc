import type { UseFormRegisterReturn } from 'react-hook-form'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import { slugify } from '@/src/lib/slug'

type SlugFieldProps = {
  id: string
  registration: UseFormRegisterReturn
  /** Current name, to preview the slug the API will generate when this field is empty. */
  name: string
  value: string
  error?: { message?: string }
  /** Public path before the slug, e.g. "/categorias/". Omit for slugs that are not URLs. */
  pathPrefix?: string
}

/** Optional URL identifier with a live preview of the resulting address. */
export function SlugField({ id, registration, name, value, error, pathPrefix }: SlugFieldProps) {
  const effective = value || slugify(name)
  return (
    <FormField
      id={id}
      label="Identificador en la URL"
      error={error}
      description={
        effective && pathPrefix ? (
          <>
            Va a quedar <span className="font-mono text-foreground">{`${pathPrefix}${effective}`}</span>. Dejalo vacío
            para generarlo con el nombre.
          </>
        ) : (
          'Dejalo vacío para generarlo con el nombre.'
        )
      }
    >
      <Input id={id} placeholder={slugify(name) || 'se-genera-solo'} aria-invalid={!!error} {...registration} />
    </FormField>
  )
}
