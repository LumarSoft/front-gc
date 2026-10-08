'use client'

import { PlusIcon, Trash2Icon } from 'lucide-react'
import { type UseFormReturn, useFieldArray } from 'react-hook-form'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import type { VariantDetailsValues } from '@/src/features/admin/lib/variant-details-form'

/** Option pairs such as Color = Cyan, Capacidad = 70 ml (used by the store's variant picker). */
export function VariantOptionsField({ form }: { form: UseFormReturn<VariantDetailsValues> }) {
  const options = useFieldArray({ control: form.control, name: 'options' })
  const errors = form.formState.errors.options

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-sm font-medium">Opciones</legend>
      {options.fields.map((field, index) => (
        <div key={field.id} className="flex items-start gap-2">
          <div className="flex-1">
            <Input
              aria-label={`Nombre de la opción ${index + 1}`}
              placeholder="Ej.: Color"
              aria-invalid={!!errors?.[index]?.name}
              {...form.register(`options.${index}.name`)}
            />
            {errors?.[index]?.name && <p className="mt-1 text-xs text-destructive">{errors[index]?.name?.message}</p>}
          </div>
          <div className="flex-1">
            <Input
              aria-label={`Valor de la opción ${index + 1}`}
              placeholder="Ej.: Cyan"
              aria-invalid={!!errors?.[index]?.value}
              {...form.register(`options.${index}.value`)}
            />
            {errors?.[index]?.value && <p className="mt-1 text-xs text-destructive">{errors[index]?.value?.message}</p>}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Quitar la opción ${index + 1}`}
            onClick={() => options.remove(index)}
          >
            <Trash2Icon />
          </Button>
        </div>
      ))}
      {options.fields.length < 5 && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="self-start"
          onClick={() => options.append({ name: '', value: '' }, { shouldFocus: true })}
        >
          <PlusIcon />
          Agregar opción
        </Button>
      )}
    </fieldset>
  )
}
