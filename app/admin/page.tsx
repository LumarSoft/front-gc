import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { CatalogSummaryPanel } from '@/src/features/admin/components/dashboard/catalog-summary-panel'
import { formatLongDate } from '@/src/lib/format'

export default function AdminHomePage() {
  const today = formatLongDate(new Date())
  return (
    <>
      <AdminPageHeader title="Panel de administración" description={today.charAt(0).toUpperCase() + today.slice(1)} />
      <CatalogSummaryPanel />
    </>
  )
}
