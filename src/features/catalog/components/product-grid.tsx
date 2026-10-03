import { ProductCard } from '@/src/features/catalog/components/product-card'
import { cn } from '@/src/lib/utils'
import type { ProductSummary } from '@/src/types/api/catalog'

type ProductGridProps = {
  products: ProductSummary[]
  /** How many of the first cards load their image eagerly (above the fold). */
  eagerCount?: number
  className?: string
}

export function ProductGrid({ products, eagerCount = 0, className }: ProductGridProps) {
  return (
    <ul className={cn('grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4', className)}>
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} priority={index < eagerCount} />
        </li>
      ))}
    </ul>
  )
}
