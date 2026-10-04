import type { Metadata } from 'next'
import { BrandsView } from '@/src/features/admin/components/brands/brands-view'

export const metadata: Metadata = { title: 'Marcas' }

export default function AdminBrandsPage() {
  return <BrandsView />
}
