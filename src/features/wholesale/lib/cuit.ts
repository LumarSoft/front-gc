const WEIGHTS = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]
const PREFIXES = new Set(['20', '23', '24', '27', '30', '33', '34'])

/** Same check as the API (official AFIP check digit), so typos are caught before sending. */
export function isValidCuit(value: string): boolean {
  const cuit = value.replace(/[\s-]/g, '')
  if (!/^\d{11}$/.test(cuit) || !PREFIXES.has(cuit.slice(0, 2))) return false
  const sum = WEIGHTS.reduce((total, weight, index) => total + weight * Number(cuit[index]), 0)
  const remainder = 11 - (sum % 11)
  const checkDigit = remainder === 11 ? 0 : remainder
  return checkDigit !== 10 && checkDigit === Number(cuit[10])
}

/** "30712345671" → "30-71234567-1" for display. */
export function formatCuit(cuit: string): string {
  return /^\d{11}$/.test(cuit) ? `${cuit.slice(0, 2)}-${cuit.slice(2, 10)}-${cuit[10]}` : cuit
}
