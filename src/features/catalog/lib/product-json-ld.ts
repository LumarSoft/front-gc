import type { ProductDetail } from '@/src/types/api/catalog'

const AVAILABILITY_SCHEMA = {
  IN_STOCK: 'https://schema.org/InStock',
  LOW_STOCK: 'https://schema.org/LimitedAvailability',
  OUT_OF_STOCK: 'https://schema.org/OutOfStock',
} as const

/** schema.org Product data, so search engines can show price and stock in results. */
export function buildProductJsonLd(product: ProductDetail, url: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription ?? undefined,
    image: product.images.map(image => image.url),
    sku: product.variants[0]?.sku,
    brand: product.brand ? { '@type': 'Brand', name: product.brand.name } : undefined,
    offers: product.price
      ? {
          '@type': 'Offer',
          url,
          priceCurrency: product.price.currency,
          price: product.price.amount,
          availability: AVAILABILITY_SCHEMA[product.availability],
        }
      : undefined,
  }
}
