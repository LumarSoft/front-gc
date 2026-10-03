'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CertificateIcon, StorefrontIcon, TruckIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { ProductBadge } from '@/src/features/catalog/components/product-badge'
import { ProductGallery } from '@/src/features/catalog/components/product/product-gallery'
import { getAvailabilityLabel } from '@/src/features/catalog/lib/availability'
import { formatMoney, getDiscountPercent } from '@/src/lib/format'
import { cn } from '@/src/lib/utils'
import type { ProductDetail, ProductVariant, SaleUnit } from '@/src/types/api/catalog'

const SALE_UNIT_LABEL: Record<SaleUnit, string> = {
  UNIT: 'unidad',
  BOX: 'caja',
  PACK: 'pack',
  ROLL: 'rollo',
  METER: 'metro',
  SQUARE_METER: 'm²',
  LITER: 'litro',
  KIT: 'kit',
}

type ProductHeroProps = {
  product: ProductDetail
}

/** Gallery + buying panel. Both follow the selected variant (photos, price and stock change per color). */
export function ProductHero({ product }: ProductHeroProps) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id)
  const variant: ProductVariant | undefined = product.variants.find(item => item.id === variantId)

  const hasVariantImages = product.images.some(image => image.variantId !== null)
  const images = hasVariantImages
    ? product.images.filter(image => image.variantId === null || image.variantId === variantId)
    : product.images

  const price = variant?.price ?? product.price
  const compareAtPrice = variant?.compareAtPrice ?? product.compareAtPrice
  const discount = price && compareAtPrice ? getDiscountPercent(price, compareAtPrice) : 0
  const availability = getAvailabilityLabel(variant?.availability ?? product.availability, product.outOfStockBehavior)
  const optionName = variant?.optionValues ? Object.keys(variant.optionValues)[0] : undefined
  const inquiryHref = `/asistente?pregunta=${encodeURIComponent(`Quiero consultar por ${product.name}`)}`

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
      <ProductGallery key={variantId} images={images} productName={product.name} brandName={product.brand?.name} />

      <div className="flex flex-col">
        <p className="text-sm font-semibold text-primary">
          {product.brand?.name} · {product.category.name}
        </p>
        <h1 className="mt-2 text-2xl leading-tight font-extrabold tracking-tight text-balance sm:text-3xl">
          {product.name}
        </h1>
        {product.badge && <ProductBadge badge={product.badge} className="mt-3 self-start" />}
        {product.shortDescription && <p className="mt-4 text-muted-foreground">{product.shortDescription}</p>}

        <div className="mt-6 rounded-3xl bg-surface p-5">
          {compareAtPrice && discount > 0 && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="line-through">{formatMoney(compareAtPrice)}</span>
              <span className="rounded-full bg-sale px-2 py-0.5 text-xs font-bold text-sale-foreground">
                -{discount}%
              </span>
            </p>
          )}
          <p className="text-3xl font-extrabold tracking-tight">{price ? formatMoney(price) : 'Consultá el precio'}</p>
          {variant && variant.saleUnit !== 'UNIT' && (
            <p className="text-sm text-muted-foreground">
              Precio por {SALE_UNIT_LABEL[variant.saleUnit]}
              {variant.unitsPerSaleUnit > 1 && ` (${variant.unitsPerSaleUnit} unidades)`}
            </p>
          )}
          <p
            className={cn(
              'mt-2 text-sm font-semibold',
              availability?.tone === 'warning' ? 'text-sale' : availability ? 'text-muted-foreground' : 'text-success',
            )}
          >
            {availability?.text ?? 'En stock'}
          </p>
        </div>

        {product.variants.length > 1 && (
          <fieldset className="mt-6">
            <legend className="text-sm font-bold">
              {optionName ?? 'Opción'}: <span className="font-normal text-muted-foreground">{variant?.name}</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.variants.map(option => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setVariantId(option.id)}
                  aria-pressed={option.id === variantId}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                    option.id === variantId
                      ? 'border-foreground bg-foreground text-background'
                      : 'hover:border-foreground',
                    option.availability === 'OUT_OF_STOCK' && 'line-through decoration-1 opacity-60',
                  )}
                >
                  {option.name ?? option.sku}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <div className="mt-6 flex flex-col gap-3">
          {/* TODO(cart): enable when the cart is built (next stage). */}
          <Button size="lg" disabled className="h-12 rounded-full text-base font-bold">
            Agregar al carrito
          </Button>
          <p className="text-center text-xs text-muted-foreground">Muy pronto vas a poder comprar online.</p>
          <Button asChild size="lg" variant="outline" className="h-12 rounded-full text-base font-semibold">
            <Link href={inquiryHref}>Consultar por este producto</Link>
          </Button>
        </div>

        <ul className="mt-8 grid gap-4 border-t pt-6 text-sm sm:grid-cols-3">
          <li className="flex items-start gap-3">
            <CertificateIcon weight="light" className="size-6 shrink-0 text-primary" aria-hidden />
            Producto original con garantía oficial
          </li>
          <li className="flex items-start gap-3">
            <StorefrontIcon weight="light" className="size-6 shrink-0 text-primary" aria-hidden />
            Retiro gratis en Rosario
          </li>
          <li className="flex items-start gap-3">
            <TruckIcon weight="light" className="size-6 shrink-0 text-primary" aria-hidden />
            Envíos a todo el país
          </li>
        </ul>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 flex items-center gap-3 border-t bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-muted-foreground">{variant?.name ?? product.name}</p>
          <p className="text-lg leading-tight font-extrabold">{price ? formatMoney(price) : 'Consultá el precio'}</p>
        </div>
        <Button asChild className="h-11 shrink-0 rounded-full px-5 font-bold">
          <Link href={inquiryHref}>Consultar</Link>
        </Button>
      </div>
    </div>
  )
}
