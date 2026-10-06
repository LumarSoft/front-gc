import type { Metadata } from 'next'
import { AdminWholesaleApplicationsView } from '@/src/features/admin/components/wholesale/admin-wholesale-applications-view'

export const metadata: Metadata = { title: 'Clientes frecuentes' }
export default function AdminWholesalePage() {
  return <AdminWholesaleApplicationsView />
}
