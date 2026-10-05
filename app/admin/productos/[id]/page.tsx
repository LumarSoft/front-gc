import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductEditorView } from '@/src/features/admin/components/products/editor/product-editor-view'

export const metadata: Metadata = { title: 'Editar producto' }

export default async function AdminProductPage({ params }: PageProps<'/admin/productos/[id]'>) {
  const id = Number((await params).id)
  if (!Number.isInteger(id) || id < 1) notFound()
  return <ProductEditorView productId={id} />
}
