import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/src/components/ui/breadcrumbs'
import { PageSection } from '@/src/components/ui/page-section'
import { SessionRefresh } from '@/src/features/auth/components/session-refresh'
import { ProductGrid } from '@/src/features/catalog/components/product-grid'
import { CompatibleWithList } from '@/src/features/catalog/components/product/compatible-with-list'
import { ProductHero } from '@/src/features/catalog/components/product/product-hero'
import { ProductJsonLd } from '@/src/features/catalog/components/product/product-json-ld'
import { ProductSpecifications } from '@/src/features/catalog/components/product/product-specifications'
import { ApiError } from '@/src/lib/api-client'
import { getProduct } from '@/src/services/catalog.service'
import { TrackActivity } from '@/src/features/activity/components/track-activity'

async function loadProduct(slug: string): ReturnType<typeof getProduct> {
  try {
    return await getProduct(slug)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound()
    throw error
  }
}

export async function generateMetadata({ params }: PageProps<'/productos/[slug]'>): Promise<Metadata> {
  const { data: product } = await loadProduct((await params).slug)
  const description = product.seoDescription ?? product.shortDescription ?? undefined
  return {
    title: product.seoTitle ?? product.name,
    description,
    openGraph: { title: product.name, description, images: product.images.slice(0, 1).map(image => image.url) },
  }
}

export default async function ProductPage({ params }: PageProps<'/productos/[slug]'>) {
  const { data: product, sessionExpired } = await loadProduct((await params).slug)
  const breadcrumbs = [product.parentCategory, product.category]
    .filter(crumb => crumb !== null)
    .map(crumb => ({ label: crumb.name, href: `/categorias/${crumb.slug}` }))

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-28 sm:px-6 lg:pt-10 lg:pb-20">
      <SessionRefresh when={sessionExpired} />
      <TrackActivity event={{ type: 'PRODUCT_VIEW', productId: product.id }} />
      <ProductJsonLd product={product} />
      <Breadcrumbs items={breadcrumbs} className="mb-6" />

      <ProductHero product={product} />

      {product.compatibleConsumables.length > 0 && (
        <PageSection title="Tintas y consumibles compatibles" description="Originales, pensados para este equipo.">
          <ProductGrid products={product.compatibleConsumables} className="md:grid-cols-4 xl:grid-cols-4" />
        </PageSection>
      )}

      {product.compatibleWith.length > 0 && (
        <PageSection title="Compatible con">
          <CompatibleWithList machines={product.compatibleWith} />
        </PageSection>
      )}

      {product.description && (
        <PageSection title="Descripción" className="max-w-3xl">
          <p className="leading-relaxed whitespace-pre-line text-muted-foreground">{product.description}</p>
        </PageSection>
      )}

      {product.specifications.length > 0 && (
        <PageSection title="Especificaciones">
          <ProductSpecifications groups={product.specifications} />
        </PageSection>
      )}
    </div>
  )
}
