'use client'

import { FolderSimpleIcon, PackageIcon, TagIcon, TrademarkIcon } from '@phosphor-icons/react'
import { Card } from '@/src/components/ui/card'
import { StatCard } from '@/src/features/admin/components/dashboard/stat-card'
import { QueryErrorState } from '@/src/features/admin/components/feedback/query-error-state'
import { useCatalogSummary } from '@/src/features/admin/hooks/use-catalog-summary'

/** Key catalog numbers for the admin home. */
export function CatalogStats() {
  const { summary, isError, retry } = useCatalogSummary()

  if (isError) {
    return (
      <Card className="py-0">
        <QueryErrorState message="No pudimos cargar los números del catálogo." onRetry={retry} />
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard label="Productos" value={summary?.products ?? null} icon={PackageIcon} hint="Sin contar archivados" />
      <StatCard
        label="Categorías"
        value={summary?.categories ?? null}
        icon={FolderSimpleIcon}
        hint={summary ? `${summary.subcategories} subcategorías` : undefined}
      />
      <StatCard label="Marcas" value={summary?.brands ?? null} icon={TrademarkIcon} />
      <StatCard label="Etiquetas" value={summary?.tags ?? null} icon={TagIcon} />
    </div>
  )
}
