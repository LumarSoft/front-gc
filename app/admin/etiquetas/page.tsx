import type { Metadata } from 'next'
import { TagsView } from '@/src/features/admin/components/tags/tags-view'

export const metadata: Metadata = { title: 'Etiquetas' }

export default function AdminTagsPage() {
  return <TagsView />
}
