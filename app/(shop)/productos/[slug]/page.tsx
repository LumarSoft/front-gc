import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SessionRefresh } from '@/src/features/auth/components/session-refresh'
import { ProductCard } from '@/src/features/catalog/components/product-card'
import { ProductHero } from '@/src/features/catalog/components/product/product-hero'
import { ProductSpecifications } from '@/src/features/catalog/components/product/product-specifications'
import { buildProductJsonLd } from '@/src/features/catalog/lib/product-json-ld'
import { ApiError } from '@/src/lib/api-client'
import { getProduct } from '@/src/services/catalog.service'

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
  const { slug } = await params
  const { data: product, sessionExpired } = await loadProduct(slug)
  const jsonLd = buildProductJsonLd(product, `/productos/${product.slug}`)
  const breadcrumbs = [product.parentCategory, product.category].filter(crumb => crumb !== null)

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 pb-28 sm:px-6 lg:pt-10 lg:pb-20">
      <SessionRefresh when={sessionExpired} />
      <script
        type="application/ld+json"
        // JSON-LD must be inline. `<` is escaped so product text can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-foreground">
              Inicio
            </Link>
          </li>
          {breadcrumbs.map(crumb => (
            <li key={crumb.slug} className="flex items-center gap-1.5">
              <span aria-hidden>/</span>
              <Link href={`/categorias/${crumb.slug}`} className="hover:text-foreground">
                {crumb.name}
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <ProductHero product={product} />

      {product.compatibleConsumables.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight">Tintas y consumibles compatibles</h2>
          <p className="mt-1 text-sm text-muted-foreground">Originales, pensados para este equipo.</p>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {product.compatibleConsumables.map(consumable => (
              <li key={consumable.id}>
                <ProductCard product={consumable} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {product.compatibleWith.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight">Compatible con</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {product.compatibleWith.map(machine => (
              <li key={machine.id}>
                <Link
                  href={`/productos/${machine.slug}`}
                  className="inline-flex rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  {machine.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {product.description && (
        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-extrabold tracking-tight">Descripción</h2>
          <p className="mt-4 leading-relaxed whitespace-pre-line text-muted-foreground">{product.description}</p>
        </section>
      )}

      {product.specifications.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight">Especificaciones</h2>
          <div className="mt-6">
            <ProductSpecifications groups={product.specifications} />
          </div>
        </section>
      )}
    </div>
  )
}
