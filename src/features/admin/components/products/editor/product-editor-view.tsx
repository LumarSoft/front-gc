'use client'

import { PackageIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { EmptyState } from '@/src/components/ui/empty-state'
import { QueryErrorState } from '@/src/features/admin/components/feedback/query-error-state'
import { AvailabilitySection } from '@/src/features/admin/components/products/editor/availability-section'
import { GallerySection } from '@/src/features/admin/components/products/editor/gallery-section'
import { GeneralSection } from '@/src/features/admin/components/products/editor/general-section'
import { OrganizationSection } from '@/src/features/admin/components/products/editor/organization-section'
import { ProductEditorHeader } from '@/src/features/admin/components/products/editor/product-editor-header'
import { ContextualSaveBar } from '@/src/features/admin/components/common/contextual-save-bar'
import { ProductEditorSkeleton } from '@/src/features/admin/components/products/editor/product-editor-skeleton'
import { SeoSection } from '@/src/features/admin/components/products/editor/seo-section'
import { SpecificationsSection } from '@/src/features/admin/components/products/editor/specifications-section'
import { StatusCard } from '@/src/features/admin/components/products/editor/status-card'
import { TagsSection } from '@/src/features/admin/components/products/editor/tags-section'
import { VariantsCard } from '@/src/features/admin/components/products/variants/variants-card'
import { useAdminProduct } from '@/src/features/admin/hooks/use-admin-products'
import { SaveBarContext, useSaveBar } from '@/src/features/admin/hooks/use-save-bar'
import { ApiError } from '@/src/lib/api-client'

/**
 * Product editor: content on the left, status and organization on the right (stacked on phones, status first). Content
 * sections save together through the save bar; variants (side panel) and status actions apply at once.
 */
export function ProductEditorView({ productId }: { productId: number }) {
  const { data: product, isPending, error, refetch } = useAdminProduct(productId)
  const saveBar = useSaveBar('Producto guardado')

  if (isPending) return <ProductEditorSkeleton />
  if (error instanceof ApiError && error.status === 404) {
    return (
      <Card className="py-0">
        <EmptyState
          icon={<PackageIcon />}
          title="Este producto no existe o fue archivado"
          description="Volvé al listado para buscar otro."
          action={
            <Button asChild variant="outline">
              <Link href="/admin/productos">Ir a productos</Link>
            </Button>
          }
        />
      </Card>
    )
  }
  if (!product) {
    return (
      <Card className="py-0">
        <QueryErrorState message="No pudimos cargar el producto." onRetry={() => void refetch()} />
      </Card>
    )
  }

  return (
    <SaveBarContext.Provider value={saveBar.registry}>
      <ContextualSaveBar
        dirty={saveBar.dirty}
        saving={saveBar.saving}
        onSave={() => void saveBar.save()}
        onDiscard={saveBar.discard}
      />
      <ProductEditorHeader product={product} />
      {/*
        Desktop: content column + side column. Phones: one column in task order (status, content, then settings);
        the column wrappers become `contents` so each section can take its own place.
      */}
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6">
        <div className="contents lg:col-span-2 lg:flex lg:flex-col lg:gap-6">
          <div className="order-2 lg:order-none">
            <GeneralSection product={product} />
          </div>
          <div className="order-3 lg:order-none">
            <GallerySection product={product} />
          </div>
          <div className="order-4 lg:order-none">
            <VariantsCard product={product} />
          </div>
          <div className="order-8 lg:order-none">
            <SpecificationsSection product={product} />
          </div>
          <div className="order-9 lg:order-none">
            <SeoSection product={product} />
          </div>
        </div>
        <div className="contents lg:flex lg:flex-col lg:gap-6">
          <div className="order-1 lg:order-none">
            <StatusCard product={product} />
          </div>
          <div className="order-5 lg:order-none">
            <OrganizationSection product={product} />
          </div>
          <div className="order-6 lg:order-none">
            <TagsSection product={product} />
          </div>
          <div className="order-7 lg:order-none">
            <AvailabilitySection product={product} />
          </div>
        </div>
      </div>
    </SaveBarContext.Provider>
  )
}
