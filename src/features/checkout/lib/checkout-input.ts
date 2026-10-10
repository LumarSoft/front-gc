import type { PreviewCheckoutRequest } from '@/src/types/api/checkout'
import { normalizeTaxId, type CheckoutValues } from './checkout-schema'

/** What the API previews and confirms, from the one-page form. */
export function previewInput(values: CheckoutValues): PreviewCheckoutRequest {
  const { taxId, ...address } = values.shippingAddress
  const input: PreviewCheckoutRequest = {
    name: `${values.firstName.trim()} ${values.lastName.trim()}`,
    email: values.email,
    phone: values.phone || undefined,
    deliveryMethod: values.deliveryMode === 'PICKUP' ? 'STORE_PICKUP' : values.deliveryMethod,
  }
  if (input.deliveryMethod === 'LOCAL_DELIVERY') return { ...input, shippingAddress: address }
  if (input.deliveryMethod === 'CARRIER')
    return {
      ...input,
      shippingAddress: { ...address, taxId: normalizeTaxId(taxId) },
      shippingQuoteId: values.shippingQuoteId!,
    }
  return input
}

/** Without accents or case, so "Córdoba" and "cordoba " compare equal. */
const plain = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()

/** Rosario delivery only goes to Rosario, Santa Fe (the API checks it again). */
export function isRosario(city: string, province: string): boolean {
  return plain(city) === 'rosario' && plain(province) === 'santa fe'
}
