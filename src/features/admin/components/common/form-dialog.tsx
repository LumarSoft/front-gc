'use client'

import { LoaderCircleIcon } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog'

type FormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  submitLabel: string
  pending: boolean
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  /** Keeps the submit button off until a required confirmation is given. */
  submitDisabled?: boolean
  /** Red submit button, for actions that cannot be undone. */
  destructive?: boolean
  children: React.ReactNode
}

/** Create/edit form in a dialog: fields scroll, the actions stay visible at the bottom. */
export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  submitLabel,
  pending,
  onSubmit,
  submitDisabled = false,
  destructive = false,
  children,
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={next => !pending && onOpenChange(next)}>
      <DialogContent className="max-h-dialog gap-0 overflow-hidden p-0 sm:max-w-lg" showCloseButton={false}>
        <form onSubmit={onSubmit} noValidate className="flex max-h-dialog flex-col">
          <DialogHeader className="border-b px-5 py-4">
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">{children}</div>
          <DialogFooter className="m-0 px-5 py-3">
            <Button type="button" variant="outline" disabled={pending} onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant={destructive ? 'destructive' : 'default'}
              disabled={pending || submitDisabled}
            >
              {pending && <LoaderCircleIcon className="size-4 animate-spin" />}
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
