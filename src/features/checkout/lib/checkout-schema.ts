import { z } from 'zod'

const address = z.object({
  street: z.string().trim().min(1, 'Ingresá la calle').max(150),
  streetNumber: z.string().trim().min(1, 'Ingresá la altura').max(20),
  city: z.string().trim().min(1, 'Ingresá la ciudad').max(100),
  province: z.string().trim().min(1, 'Ingresá la provincia').max(100),
  postalCode: z.string().trim().min(1, 'Ingresá el código postal').max(10),
})

export const checkoutSchema = z
  .object({
    name: z.string().trim().min(1, 'Ingresá tu nombre y apellido').max(200),
    email: z.string().trim().email('Revisá el formato del email').max(191),
    phone: z.string().trim().max(30, 'Revisá el teléfono'),
    deliveryMethod: z.enum(['STORE_PICKUP', 'LOCAL_DELIVERY', 'CARRIER']),
    shippingAddress: z.object({
      street: z.string(),
      streetNumber: z.string(),
      city: z.string(),
      province: z.string(),
      postalCode: z.string(),
    }),
  })
  .superRefine((values, ctx) => {
    if (values.deliveryMethod !== 'LOCAL_DELIVERY') return
    const result = address.safeParse(values.shippingAddress)
    if (!result.success)
      for (const issue of result.error.issues)
        ctx.addIssue({ code: 'custom', message: issue.message, path: ['shippingAddress', ...issue.path] })
  })

export type CheckoutValues = z.infer<typeof checkoutSchema>
