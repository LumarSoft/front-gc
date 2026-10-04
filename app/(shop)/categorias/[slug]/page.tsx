import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CatalogView } from '@/src/features/catalog/components/catalog/catalog-view'
import { parseCatalogParams, toProductQuery, USE_TAG_GROUP } from '@/src/features/catalog/lib/catalog-params'
import { ApiError } from '@/src/lib/api-client'
import { getCategory, getProducts, getTags } from '@/src/services/catalog.service'
import type { Category } from '@/src/types/api/catalog'

async function loadCategory(slug: string): Promise<Category> {
  try {
    return await getCategory(slug)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound()
    throw error
  }
}

export async function generateMetadata({ params }: PageProps<'/categorias/[slug]'>): Promise<Metadata> {
  const category = await loadCategory((await params).slug)
  const name = category.parent ? `${category.parent.name} ${category.name.toLowerCase()}` : category.name
  return {
    title: name,
    description: category.description ?? `${name} originales con envío a todo el país y retiro gratis en Rosario.`,
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps<'/categorias/[slug]'>) {
  const { slug } = await params
  const catalogParams = parseCatalogParams(await searchParams)
  const [category, { data: result, sessionExpired }, useTags] = await Promise.all([
    loadCategory(slug),
    getProducts(toProductQuery(catalogParams, slug)),
    getTags(USE_TAG_GROUP),
  ])

  // Subcategories of this category; on a subcategory, its siblings so the visitor can switch.
  const parent = category.parent ? await loadCategory(category.parent.slug) : category

  return (
    <CatalogView
      title={category.name}
      description={category.description}
      breadcrumbs={category.parent ? [category.parent] : []}
      basePath={`/categorias/${slug}`}
      params={catalogParams}
      result={result}
      sessionExpired={sessionExpired}
      categories={parent.children}
      activeCategorySlug={slug}
      useTags={useTags}
    />
  )
}
