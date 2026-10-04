import type { Metadata } from 'next'
import { CategoriesView } from '@/src/features/admin/components/categories/categories-view'

export const metadata: Metadata = { title: 'Categorías' }

export default function AdminCategoriesPage() {
  return <CategoriesView />
}
