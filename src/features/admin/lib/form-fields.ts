import { z } from 'zod'

/** Whole number typed in a text box ("12"); empty allowed when `optional`. Kept as text until submit. */
export function intText({ min, max, optional }: { min: number; max: number; optional?: boolean }) {
  return z
    .string()
    .trim()
    .refine(
      value => (optional && value === '') || (/^\d+$/.test(value) && Number(value) >= min && Number(value) <= max),
      optional ? `Un número entre ${min} y ${max}, o vacío.` : `Un número entre ${min} y ${max}.`,
    )
}

export const toIntOrNull = (value: string): number | null => (value.trim() === '' ? null : Number(value))
export const intToText = (value: number | null | undefined): string =>
  value === null || value === undefined ? '' : String(value)
