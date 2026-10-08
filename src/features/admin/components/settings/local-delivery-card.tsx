'use client'

import { Controller } from 'react-hook-form'
import { Card } from '@/src/components/ui/card'
import { FormField } from '@/src/components/ui/form-field'
import { SwitchField } from '@/src/components/ui/switch-field'
import { MoneyField } from '@/src/features/admin/components/settings/money-field'
import { useLocalDeliveryForm } from '@/src/features/admin/hooks/use-admin-settings'
import { useSaveSection } from '@/src/features/admin/hooks/use-save-bar'
import type { AdminSettings } from '@/src/types/api/admin-settings'

/** Rosario delivery: whether checkout offers it, its rate and from which amount it is free. */
export function LocalDeliveryCard({ settings }: { settings: AdminSettings }) {
  const { form, section } = useLocalDeliveryForm(settings)
  useSaveSection(section)
  const { errors } = form.formState
  const active = form.watch('isActive')

  return (
    <Card className="gap-0 p-4">
      <Controller
        control={form.control}
        name="isActive"
        render={({ field }) => (
          <SwitchField
            id="local-delivery-active"
            label="Ofrecer entrega en Rosario"
            description={
              active
                ? 'Aparece en el checkout para direcciones de Rosario, Santa Fe.'
                : 'Apagada: el checkout solo ofrece retiro en el local.'
            }
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )}
      />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <FormField id="local-delivery-rate" label="Tarifa" error={errors.flatRate} description="Por pedido, en pesos.">
          <MoneyField
            id="local-delivery-rate"
            placeholder="Sin cargar"
            aria-invalid={!!errors.flatRate}
            {...form.register('flatRate')}
          />
        </FormField>
        <FormField
          id="local-delivery-free"
          label="Envío gratis desde"
          error={errors.freeShippingThreshold}
          description="Subtotal del pedido. Vacío: nunca es gratis."
        >
          <MoneyField
            id="local-delivery-free"
            placeholder="Opcional"
            aria-invalid={!!errors.freeShippingThreshold}
            {...form.register('freeShippingThreshold')}
          />
        </FormField>
      </div>
    </Card>
  )
}
