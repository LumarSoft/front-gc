'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { cn } from '@/src/lib/utils'
import { APPLICANT_TAX_CONDITIONS, TAX_CONDITION_LABEL } from '../lib/wholesale-labels'
import type { WholesaleApplicationValues } from '../lib/wholesale-schema'

export function TaxConditionField() {
  const { register, control, getFieldState, formState } = useFormContext<WholesaleApplicationValues>()
  const selected = useWatch({ control, name: 'taxCondition' })
  const { error } = getFieldState('taxCondition', formState)
  return (
    <fieldset aria-describedby={error ? 'wholesale-tax-error' : undefined}>
      <legend className="text-sm font-medium">Condición frente al IVA</legend>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {APPLICANT_TAX_CONDITIONS.map(condition => (
          <label
            key={condition}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm',
              selected === condition && 'border-primary bg-primary/5 font-semibold',
            )}
          >
            <input type="radio" value={condition} className="size-4 accent-primary" {...register('taxCondition')} />
            {TAX_CONDITION_LABEL[condition]}
          </label>
        ))}
      </div>
      {error && (
        <p id="wholesale-tax-error" role="alert" className="mt-2 text-sm text-destructive">
          {error.message}
        </p>
      )}
    </fieldset>
  )
}
