import { z } from 'zod'

const email = z.string().trim().min(1, 'Ingresá tu email').email('Revisá el formato del email')

/** Same rules as the API: 8–72 characters with at least one letter and one number. */
const newPassword = z
  .string()
  .min(8, 'Usá al menos 8 caracteres')
  .max(72, 'Usá como máximo 72 caracteres')
  .regex(/[A-Za-z]/, 'Incluí al menos una letra')
  .regex(/\d/, 'Incluí al menos un número')

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Ingresá tu contraseña'),
})

export const registerSchema = z.object({
  firstName: z.string().trim().min(1, 'Ingresá tu nombre').max(100),
  lastName: z.string().trim().min(1, 'Ingresá tu apellido').max(100),
  email,
  phone: z.string().trim().max(30, 'Revisá el teléfono').optional(),
  password: newPassword,
  marketingOptIn: z.boolean(),
})

export const forgotPasswordSchema = z.object({ email })

export const resetPasswordSchema = z
  .object({ password: newPassword, confirmPassword: z.string() })
  .refine(values => values.password === values.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>
