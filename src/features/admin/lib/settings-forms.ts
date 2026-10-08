import { z } from 'zod'
import { formatMoneyInput, parseMoneyInput } from '@/src/lib/money-input'
import type { AdminSettings, LocalDeliveryInput, ReservationInput } from '@/src/types/api/admin-settings'

const AMOUNT_HINT = 'Escribí un monto válido (ej.: 3.500 o 3.500,50).'
const isZero = (amount: string): boolean => /^0+\.00$/.test(amount)

export const localDeliverySchema = z
  .object({ isActive: z.boolean(), flatRate: z.string(), freeShippingThreshold: z.string() })
  .superRefine((values, context) => {
    const rate = values.flatRate.trim()
    if (rate ? !parseMoneyInput(rate) : values.isActive) {
      context.addIssue({
        code: 'custom',
        path: ['flatRate'],
        message: rate ? AMOUNT_HINT : 'Cargá la tarifa para activar la entrega (0 si es gratis).',
      })
    }
    const threshold = values.freeShippingThreshold.trim()
    if (!threshold) return
    const parsed = parseMoneyInput(threshold)
    if (!parsed || isZero(parsed)) {
      context.addIssue({
        code: 'custom',
        path: ['freeShippingThreshold'],
        message: parsed ? 'Tiene que ser mayor a cero, o dejalo vacío.' : AMOUNT_HINT,
      })
    }
  })
export type LocalDeliveryValues = z.infer<typeof localDeliverySchema>

export function localDeliveryValues(settings: AdminSettings): LocalDeliveryValues {
  const { isActive, flatRate, freeShippingThreshold } = settings.localDelivery
  return {
    isActive,
    flatRate: flatRate ? formatMoneyInput(flatRate.amount) : '',
    freeShippingThreshold: freeShippingThreshold ? formatMoneyInput(freeShippingThreshold.amount) : '',
  }
}

export function toLocalDeliveryInput(values: LocalDeliveryValues): LocalDeliveryInput {
  return {
    isActive: values.isActive,
    flatRate: parseMoneyInput(values.flatRate.trim()),
    freeShippingThreshold: parseMoneyInput(values.freeShippingThreshold.trim()),
  }
}

export const RESERVATION_HOURS_MAX = 168

export const reservationSchema = z.object({
  manualHours: z
    .string()
    .trim()
    .regex(/^\d+$/, 'Escribí una cantidad de horas en números.')
    .refine(value => Number(value) >= 1 && Number(value) <= RESERVATION_HOURS_MAX, {
      message: `Entre 1 y ${RESERVATION_HOURS_MAX} horas (una semana).`,
    }),
})
export type ReservationValues = z.infer<typeof reservationSchema>

export const reservationValues = (settings: AdminSettings): ReservationValues => ({
  manualHours: String(settings.reservation.manualHours),
})

export const toReservationInput = (values: ReservationValues): ReservationInput => ({
  manualHours: Number(values.manualHours),
})
