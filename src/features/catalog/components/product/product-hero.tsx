'use client'

import { ProductBadge } from '@/src/features/catalog/components/product-badge'
import { MobileBuyBar } from '@/src/features/catalog/components/product/mobile-buy-bar'
import { ProductActions } from '@/src/features/catalog/components/product/product-actions'
import { ProductGallery } from '@/src/features/catalog/components/product/product-gallery'
import { ProductPrice } from '@/src/features/catalog/components/product/product-price'
import { ProductTrustList } from '@/src/features/catalog/components/product/product-trust-list'
import { VariantPicker } from '@/src/features/catalog/components/product/variant-picker'
import { useSelectedVariant } from '@/src/features/catalog/hooks/use-selected-variant'
import { useAddToCart } from '@/src/features/cart/hooks/use-add-to-cart'
import { FavoriteButton } from '@/src/features/favorites/components/favorite-button'
import type { ProductDetail } from '@/src/types/api/catalog'

type ProductHeroProps = {
  product: ProductDetail
}

/** Gallery + buying panel. Both follow the selected variant (photos, price and stock change per color). */
export function ProductHero({ product }: ProductHeroProps) {
  const { variant, selectVariant, images, price, compareAtPrice, availability } = useSelectedVariant(product)
  const cart = useAddToCart(variant, product.id)
  const inquiryHref = `/asistente?pregunta=${encodeURIComponent(`Quiero consultar por ${product.name}`)}`

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
      <ProductGallery key={variant?.id} images={images} productName={product.name} brandName={product.brand?.name} />

      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm font-semibold text-primary">
            {product.brand?.name} · {product.category.name}
          </p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h1 className="text-2xl leading-tight font-extrabold tracking-tight text-balance sm:text-3xl">
              {product.name}
            </h1>
            <FavoriteButton productId={product.id} productName={product.name} className="shrink-0" />
          </div>
          {product.badge && <ProductBadge badge={product.badge} className="mt-3" />}
          {product.shortDescription && <p className="mt-4 text-muted-foreground">{product.shortDescription}</p>}
        </div>
        <ProductPrice price={price} compareAtPrice={compareAtPrice} availability={availability} variant={variant} />
        <VariantPicker variants={product.variants} selected={variant} onSelect={selectVariant} />
        <ProductActions inquiryHref={inquiryHref} cart={cart} />
        <ProductTrustList />
      </div>

      <MobileBuyBar title={variant?.name ?? product.name} price={price} inquiryHref={inquiryHref} cart={cart} />
    </div>
  )
}
