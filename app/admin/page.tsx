import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { CatalogStats } from '@/src/features/admin/components/dashboard/catalog-stats'
import { ProductsByCategoryCard } from '@/src/features/admin/components/dashboard/products-by-category-card'

export default function AdminHomePage() {
  return (
    <>
      <AdminPageHeader title="Inicio" description="Un resumen del catálogo de la tienda." />
      <div className="flex flex-col gap-4 lg:gap-6">
        <CatalogStats />
        <ProductsByCategoryCard />
      </div>
    </>
  )
}
