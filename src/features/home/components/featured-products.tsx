import { ScrollRail } from '@/src/components/ui/scroll-rail'
import { SectionHeading } from '@/src/components/ui/section-heading'
import { ProductCard } from '@/src/features/catalog/components/product-card'
import type { ProductSummary } from '@/src/types/api/catalog'

type FeaturedProductsProps = {
  /** Null when the catalog could not be loaded. */
  products: ProductSummary[] | null
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products?.length === 0) return null

  return (
    <section className="mt-10 bg-surface py-12 lg:mt-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          title="Productos"
          highlight="destacados"
          size="compact"
          action={{ label: 'Ver todos los productos', href: '/productos' }}
        />
        {products ? (
          <ScrollRail label="Productos destacados" className="mt-6">
            {products.map(product => (
              <li key={product.id} className="w-64 shrink-0 snap-start px-2 sm:w-1/3 lg:w-1/4">
                <ProductCard product={product} />
              </li>
            ))}
          </ScrollRail>
        ) : (
          <p className="mt-6 text-muted-foreground">
            No pudimos cargar los productos destacados. Probá recargar la página en unos segundos.
          </p>
        )}
      </div>
    </section>
  )
}
