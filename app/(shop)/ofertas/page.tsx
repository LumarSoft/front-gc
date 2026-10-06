import type { Metadata } from 'next'
import { CatalogView } from '@/src/features/catalog/components/catalog/catalog-view'
import { OffersEmptyState } from '@/src/features/catalog/components/catalog/offers-empty-state'
import { parseCatalogParams, toProductQuery, USE_TAG_GROUP } from '@/src/features/catalog/lib/catalog-params'
import { getCategories, getProducts, getTags } from '@/src/services/catalog.service'

export const metadata: Metadata = {
  title: 'Ofertas',
  description: 'Impresoras, tintas y consumibles con precio rebajado.',
}

export default async function OffersPage({ searchParams }: PageProps<'/ofertas'>) {
  const params = parseCatalogParams(await searchParams)
  const [{ data: result, sessionExpired }, categories, useTags] = await Promise.all([
    getProducts({ ...toProductQuery(params), onSale: true }),
    getCategories(),
    getTags(USE_TAG_GROUP),
  ])

  return (
    <CatalogView
      title="Ofertas"
      description="Productos con precio rebajado para tu perfil de compra, mientras haya stock."
      breadcrumbs={[]}
      basePath="/ofertas"
      params={params}
      result={result}
      sessionExpired={sessionExpired}
      categories={categories}
      useTags={useTags}
      emptyState={<OffersEmptyState />}
    />
  )
}
