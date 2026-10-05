'use client'

import type { UseFormReturn } from 'react-hook-form'
import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import type { SpecificationsValues } from '@/src/features/admin/lib/specifications-form'

type SpecificationRowProps = {
  form: UseFormReturn<SpecificationsValues>
  index: number
  total: number
  onMove: (to: number) => void
  onRemove: () => void
}

/** Group · name · value, with order controls. Stacks on phones. */
export function SpecificationRowFields({ form, index, total, onMove, onRemove }: SpecificationRowProps) {
  const errors = form.formState.errors.rows?.[index]
  const label = `fila ${index + 1}`
  return (
    <li className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-start sm:border-0 sm:p-0">
      <Input
        aria-label={`Grupo de la ${label}`}
        placeholder="Grupo (opcional)"
        className="sm:w-40"
        {...form.register(`rows.${index}.groupName`)}
      />
      <div className="flex-1">
        <Input
          aria-label={`Nombre de la ${label}`}
          placeholder="Nombre"
          aria-invalid={!!errors?.name}
          {...form.register(`rows.${index}.name`)}
        />
        {errors?.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div className="flex-1">
        <Input
          aria-label={`Valor de la ${label}`}
          placeholder="Valor"
          aria-invalid={!!errors?.value}
          {...form.register(`rows.${index}.value`)}
        />
        {errors?.value && <p className="mt-1 text-xs text-destructive">{errors.value.message}</p>}
      </div>
      <div className="flex justify-end gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Subir ${label}`}
          disabled={index === 0}
          onClick={() => onMove(index - 1)}
        >
          <ArrowUpIcon />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Bajar ${label}`}
          disabled={index === total - 1}
          onClick={() => onMove(index + 1)}
        >
          <ArrowDownIcon />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Quitar ${label}`}
          onClick={onRemove}
          className="text-destructive"
        >
          <TrashIcon />
        </Button>
      </div>
    </li>
  )
}
