import { z } from 'zod'
import { isValidCuit } from '@/src/features/wholesale/lib/cuit'

const address = z.object({
  street: z.string().trim().min(1, 'Ingresá la calle').max(150),
  streetNumber: z.string().trim().min(1, 'Ingresá la altura').max(20),
  city: z.string().trim().min(1, 'Ingresá la ciudad').max(100),
  province: z.string().trim().min(1, 'Elegí la provincia').max(100),
  postalCode: z.string().trim().min(1, 'Ingresá el código postal').max(10),
})

/** Where a carrier quote goes; checked on its own before quoting. */
export const DESTINATION_FIELDS = [
  'shippingAddress.postalCode',
  'shippingAddress.city',
  'shippingAddress.province',
] as const

/** DNI or CUIT as the API expects it: digits only. */
export function normalizeTaxId(value: string): string {
  return value.replace(/[\s.-]/g, '')
}

function taxIdError(value: string): string | null {
  const taxId = normalizeTaxId(value)
  if (!taxId) return 'Ingresá el DNI o CUIT de quien recibe'
  if (/^\d{7,8}$/.test(taxId)) return null
  if (/^\d{11}$/.test(taxId)) return isValidCuit(taxId) ? null : 'Revisá el CUIT: el último número es el verificador'
  return 'Revisá el número: el DNI tiene 7 u 8 números y el CUIT, 11'
}

/**
 * The whole checkout on one page. `deliveryMode` is the buyer's first choice (shipping or pickup); in shipping mode
 * `deliveryMethod` says which shipping method they picked (Rosario delivery or a carrier quote).
 */
export const checkoutSchema = z
  .object({
    email: z.string().trim().email('Ingresá un email válido').max(191),
    firstName: z.string().trim().min(1, 'Ingresá tu nombre').max(100),
    lastName: z.string().trim().min(1, 'Ingresá tu apellido').max(99),
    phone: z.string().trim().max(30, 'Revisá el teléfono'),
    deliveryMode: z.enum(['SHIP', 'PICKUP']),
    deliveryMethod: z.enum(['STORE_PICKUP', 'LOCAL_DELIVERY', 'CARRIER']),
    shippingAddress: z.object({
      street: z.string(),
      streetNumber: z.string(),
      city: z.string(),
      province: z.string(),
      postalCode: z.string(),
      taxId: z.string(),
    }),
    shippingQuoteId: z.number().int().positive().nullable(),
    paymentMethod: z.enum(['MANUAL', 'MERCADO_PAGO']),
  })
  .superRefine((values, ctx) => {
    if (values.deliveryMode === 'PICKUP') return
    const result = address.safeParse(values.shippingAddress)
    if (!result.success)
      for (const issue of result.error.issues)
        ctx.addIssue({ code: 'custom', message: issue.message, path: ['shippingAddress', ...issue.path] })
    if (values.deliveryMethod !== 'CARRIER') return
    if (!values.shippingQuoteId)
      ctx.addIssue({ code: 'custom', message: 'Elegí un método de envío', path: ['shippingQuoteId'] })
    const taxId = taxIdError(values.shippingAddress.taxId)
    if (taxId) ctx.addIssue({ code: 'custom', message: taxId, path: ['shippingAddress', 'taxId'] })
    if (!values.phone)
      ctx.addIssue({ code: 'custom', message: 'Ingresá un teléfono para coordinar la entrega', path: ['phone'] })
  })

export type CheckoutValues = z.infer<typeof checkoutSchema>
