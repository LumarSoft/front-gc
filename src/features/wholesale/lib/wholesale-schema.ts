import { z } from 'zod'
import { isValidCuit } from './cuit'

export const wholesaleApplicationSchema = z.object({
  legalName: z.string().trim().min(2, 'Ingresá la razón social').max(200),
  tradeName: z.string().trim().max(200),
  cuit: z.string().trim().refine(isValidCuit, 'Revisá el CUIT: son 11 números y el último es el verificador'),
  taxCondition: z.enum(['RESPONSABLE_INSCRIPTO', 'MONOTRIBUTISTA', 'EXENTO'], {
    error: 'Elegí la condición frente al IVA',
  }),
  email: z.string().trim().email('Revisá el formato del email').max(191),
  phone: z.string().trim().max(30, 'Revisá el teléfono'),
  message: z.string().trim().max(1000, 'Usá hasta 1000 caracteres'),
})

export type WholesaleApplicationValues = z.infer<typeof wholesaleApplicationSchema>
