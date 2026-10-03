import type { Metadata } from 'next'
import { CatalogView } from '@/src/features/catalog/components/catalog/catalog-view'
import { parseCatalogParams, toProductQuery } from '@/src/features/catalog/lib/catalog-params'
import { getCategories, getProducts } from '@/src/services/catalog.service'

export async function generateMetadata({ searchParams }: PageProps<'/productos'>): Promise<Metadata> {
  const { q } = parseCatalogParams(await searchParams)
  return q
    ? { title: `Resultados para “${q}”`, robots: { index: false, follow: true } }
    : {
        title: 'Todos los productos',
        description: 'Impresoras Epson, tintas originales, escáneres, proyectores y más.',
      }
}

export default async function ProductsPage({ searchParams }: PageProps<'/productos'>) {
  const params = parseCatalogParams(await searchParams)
  const [{ data: result, sessionExpired }, categories] = await Promise.all([
    getProducts(toProductQuery(params)),
    getCategories(),
  ])

  return (
    <CatalogView
      title={params.q ? `Resultados para “${params.q}”` : 'Todos los productos'}
      description={params.q ? null : 'Equipos y consumibles originales, con asesoramiento antes y después de comprar.'}
      breadcrumbs={[]}
      basePath="/productos"
      params={params}
      result={result}
      sessionExpired={sessionExpired}
      categories={categories}
    />
  )
}
