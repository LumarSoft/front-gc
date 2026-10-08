'use client'

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { type SaveSection, useSaveSection } from '@/src/features/admin/hooks/use-save-bar'

type ProductEditorCardProps = {
  title: string
  description?: string
  /** Extra control in the header (e.g. "Agregar fila"). */
  action?: React.ReactNode
  /** The section's state and actions; the page's save bar saves or discards it with the rest. */
  section: SaveSection
  children: React.ReactNode
}

/** One block of the product page. No buttons of its own: changes go through the save bar on top. */
export function ProductEditorCard({ title, description, action, section, children }: ProductEditorCardProps) {
  useSaveSection(section)
  return (
    <Card className="gap-0">
      <CardHeader className="border-b">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent className="py-5">{children}</CardContent>
    </Card>
  )
}
