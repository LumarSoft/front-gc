import type { CheckoutPaymentMethod, CheckoutPaymentOption } from '@/src/types/api/checkout'

export const PAYMENT_OPTION_COPY: Record<CheckoutPaymentMethod, { name: string; hint: string; details: string }> = {
  MERCADO_PAGO: {
    name: 'Mercado Pago',
    hint: 'Crédito, débito o dinero en cuenta',
    details:
      'Al tocar "Pagar ahora" te llevamos a Mercado Pago para pagar de forma segura. Tu pedido se confirma apenas se aprueba el pago.',
  },
  MANUAL: {
    name: 'Pago a coordinar con el local',
    hint: 'Te contactamos para cobrarte',
    details: 'El pedido queda pendiente hasta que el equipo verifique el pago.',
  },
}

/** "1 hora", "24 horas", "90 minutos". */
export function formatReservation(minutes: number): string {
  if (minutes % 60) return `${minutes} minutos`
  const hours = minutes / 60
  return hours === 1 ? '1 hora' : `${hours} horas`
}

/** Online payment first when the store offers it: it needs no one to check the payment by hand. */
export function sortPaymentOptions(options: CheckoutPaymentOption[]): CheckoutPaymentOption[] {
  return [...options].sort((a, b) => Number(b.method === 'MERCADO_PAGO') - Number(a.method === 'MERCADO_PAGO'))
}

export function defaultPaymentMethod(options: CheckoutPaymentOption[]): CheckoutPaymentMethod {
  return sortPaymentOptions(options)[0]?.method ?? 'MANUAL'
}
