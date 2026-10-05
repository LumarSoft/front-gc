/**
 * Money typed by an admin in Argentina: "419.999,90", "419999,9" or "419999.90" → "419999.90" (the API's decimal
 * string). Returns null when it is not a valid positive amount with up to `decimals` decimals.
 */
export function parseMoneyInput(text: string, decimals = 2): string | null {
  const compact = text.replace(/\s|\$/g, '')
  if (!compact) return null
  // With a comma, dots are thousands separators. Without one, "1.200" / "1.250.000" (groups of three) are thousands
  // too, as written in Argentina; any other single dot is the decimal point ("12.5").
  const thousandsOnly = /^\d{1,3}(\.\d{3})+$/.test(compact)
  const normalized = compact.includes(',') || thousandsOnly ? compact.replace(/\./g, '').replace(',', '.') : compact
  const pattern = new RegExp(`^\\d+(\\.\\d{1,${decimals}})?$`)
  if (!pattern.test(normalized)) return null
  const [whole, fraction = ''] = normalized.split('.')
  return `${whole.replace(/^0+(?=\d)/, '')}.${fraction.padEnd(decimals, '0')}`
}

/** "419999.90" → "419.999,90" for an input box (display only). */
export function formatMoneyInput(amount: string, decimals = 2): string {
  const [whole, fraction = ''] = amount.split('.')
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  const cents = fraction.padEnd(decimals, '0').slice(0, decimals)
  return /^0+$/.test(cents) ? grouped : `${grouped},${cents}`
}

/** USD amount × ARS-per-USD rate, rounded to cents, with integers only (no floating point). */
export function convertToArs(usdAmount: string, rate: string): string {
  const toUnits = (value: string, decimals: number): bigint => {
    const [whole, fraction = ''] = value.split('.')
    return BigInt(whole + fraction.padEnd(decimals, '0').slice(0, decimals))
  }
  const cents = toUnits(usdAmount, 2) // amount × 100
  const rateUnits = toUnits(rate, 4) // rate × 10_000
  const product = cents * rateUnits // ARS × 1_000_000
  const roundedCents = (product + BigInt(5_000)) / BigInt(10_000) // half up, → ARS × 100
  const text = roundedCents.toString().padStart(3, '0')
  return `${text.slice(0, -2)}.${text.slice(-2)}`
}
