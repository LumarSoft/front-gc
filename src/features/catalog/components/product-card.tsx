import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import { ProductBadge } from '@/src/features/catalog/components/product-badge'
import { formatMoney, getDiscountPercent } from '@/src/lib/format'
import type { ProductSummary } from '@/src/types/api/products'

type ProductCardProps = {
  product: ProductSummary
}

export function ProductCard({ product }: ProductCardProps) {
  const href = `/productos/${product.slug}`
  const discount = product.compareAtPrice ? getDiscountPercent(product.price, product.compareAtPrice) : 0

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative aspect-square bg-white">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 280px, (min-width: 768px) 30vw, 70vw"
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {product.badge && <ProductBadge badge={product.badge} />}
          {discount > 0 && (
            <span className="rounded-full bg-foreground px-2 py-0.5 text-xs font-bold text-background">
              -{discount}%
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t p-4">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{product.category}</p>
        <h3 className="line-clamp-2 text-sm leading-snug font-semibold">
          <Link href={href} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-1 text-xs text-muted-foreground">{product.highlight}</p>
        <div className="mt-auto flex flex-col gap-0.5 pt-2">
          {product.compareAtPrice && (
            <p className="text-xs text-muted-foreground line-through">{formatMoney(product.compareAtPrice)}</p>
          )}
          <p className="text-xl font-extrabold tracking-tight">{formatMoney(product.price)}</p>
          {product.installments && (
            <p className="text-xs font-semibold text-success">Hasta {product.installments} cuotas sin interés</p>
          )}
          {product.lowStock && <p className="text-xs font-semibold text-sale">Quedan pocas unidades</p>}
        </div>
        <span className="mt-2 flex h-10 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-colors group-hover:bg-navy">
          Comprar
          <ArrowRightIcon
            weight="regular"
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </article>
  )
}
