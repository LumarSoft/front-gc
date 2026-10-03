import { buildProductJsonLd } from '@/src/features/catalog/lib/product-json-ld'
import type { ProductDetail } from '@/src/types/api/catalog'

type ProductJsonLdProps = {
  product: ProductDetail
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const jsonLd = buildProductJsonLd(product, `/productos/${product.slug}`)
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be inline. `<` is escaped so product text can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  )
}
