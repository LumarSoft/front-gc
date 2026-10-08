'use client'

import { Card } from '@/src/components/ui/card'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import { useReservationForm } from '@/src/features/admin/hooks/use-admin-settings'
import { useSaveSection } from '@/src/features/admin/hooks/use-save-bar'
import type { AdminSettings } from '@/src/types/api/admin-settings'

/** How long a pending order keeps its products reserved while the payment is coordinated. */
export function ReservationCard({ settings }: { settings: AdminSettings }) {
  const { form, section } = useReservationForm(settings)
  useSaveSection(section)
  const { errors } = form.formState

  return (
    <Card className="gap-0 p-4">
      <FormField
        id="reservation-hours"
        label="Horas de reserva"
        error={errors.manualHours}
        description={
          settings.reservation.isDefault
            ? 'Hoy rige el valor por defecto (24 horas). Entre 1 y 168.'
            : 'Entre 1 y 168 (una semana). Los pedidos ya hechos mantienen su vencimiento.'
        }
      >
        <div className="flex items-center gap-2">
          <Input
            id="reservation-hours"
            inputMode="numeric"
            className="w-24 tabular-nums"
            aria-invalid={!!errors.manualHours}
            {...form.register('manualHours')}
          />
          <span className="text-sm text-muted-foreground">horas</span>
        </div>
      </FormField>
    </Card>
  )
}
