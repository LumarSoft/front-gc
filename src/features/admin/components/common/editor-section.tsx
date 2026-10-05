'use client'

import { CircleNotchIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'
import { useUnsavedChangesWarning } from '@/src/hooks/use-unsaved-changes-warning'

type EditorSectionProps = {
  title: string
  description?: string
  /** Extra control in the header (e.g. "Agregar fila"). */
  action?: React.ReactNode
  /** Unsaved changes: enables "Guardar" and "Descartar". */
  dirty: boolean
  pending: boolean
  onSave: () => void
  onDiscard: () => void
  children: React.ReactNode
}

/** One block of an editor that saves on its own, so a long form never loses work and errors stay local. */
export function EditorSection({
  title,
  description,
  action,
  dirty,
  pending,
  onSave,
  onDiscard,
  children,
}: EditorSectionProps) {
  useUnsavedChangesWarning(dirty)
  return (
    <Card className="gap-0 shadow-xs ring-foreground/8">
      <CardHeader className="border-b">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent className="py-5">{children}</CardContent>
      <CardFooter className="justify-end gap-2 border-t">
        {dirty && !pending && (
          <span className="mr-auto text-xs text-muted-foreground" role="status">
            Cambios sin guardar
          </span>
        )}
        <Button type="button" variant="ghost" size="sm" disabled={!dirty || pending} onClick={onDiscard}>
          Descartar
        </Button>
        <Button type="button" size="sm" disabled={!dirty || pending} onClick={onSave}>
          {pending && <CircleNotchIcon className="animate-spin" />}
          Guardar
        </Button>
      </CardFooter>
    </Card>
  )
}
