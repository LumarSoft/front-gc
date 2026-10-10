import type { CheckoutPaymentMethod, CheckoutPaymentOption } from '@/src/types/api/checkout'

export const PAYMENT_OPTION_COPY: Record<CheckoutPaymentMethod, { name: string; description: string }> = {
  MERCADO_PAGO: {
    name: 'Mercado Pago',
    description:
      'Pagá con tarjeta de crédito, débito o dinero en tu cuenta de Mercado Pago. Tu pedido se confirma apenas se aprueba el pago.',
  },
  MANUAL: {
    name: 'Pago a coordinar con el local',
    description: 'El pedido queda pendiente hasta que el equipo verifique el pago.',
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
