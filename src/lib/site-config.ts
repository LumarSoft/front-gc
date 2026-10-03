/**
 * Store-wide copy and company data.
 * TODO(client-data): confirm every value marked SAMPLE with Comunicaciones Gráficas before going live.
 */
export const SITE = {
  name: 'Comunicaciones Gráficas',
  shortName: 'CG',
  description:
    'Distribuidor oficial Epson en Rosario. Impresoras EcoTank, tintas originales, papeles e insumos gráficos con envío a todo el país.',
  city: 'Rosario, Santa Fe',
  yearsInBusiness: 50,
  // SAMPLE — real address, phone, email and hours pending.
  address: 'Dirección a confirmar',
  phone: 'Teléfono a confirmar',
  email: 'ventas@ejemplo.com.ar',
  hours: 'Lun a vie · horario a confirmar',
} as const

/** SAMPLE — the real threshold comes from the API shipping config. */
export const SAMPLE_FREE_SHIPPING_THRESHOLD = { amount: '150000.00', currency: 'ARS' } as const
