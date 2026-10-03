import { SectionHeading } from '@/src/components/ui/section-heading'
import { ProductCard } from '@/src/features/catalog/components/product-card'
import type { ProductSummary } from '@/src/types/api/products'

type FeaturedProductsProps = {
  products: ProductSummary[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Los más elegidos"
          title="Equipos que nuestros clientes recomiendan"
          action={{ label: 'Ver todos los productos', href: '/productos' }}
        />
      </div>
      <ul className="no-scrollbar mx-auto mt-10 flex max-w-7xl snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:scroll-px-6 sm:px-6 lg:grid lg:grid-cols-4 lg:overflow-visible">
        {products.map(product => (
          <li key={product.id} className="w-64 shrink-0 snap-start lg:w-auto">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}
