'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CircleNotchIcon, ImageSquareIcon, TrashIcon, UploadSimpleIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { useImageUpload } from '@/src/features/admin/hooks/use-image-upload'
import { cn } from '@/src/lib/utils'

export type ImageValue = { id: number; url: string }

type ImageUploadFieldProps = {
  id: string
  label: string
  hint?: string
  value: ImageValue | null
  onChange: (value: ImageValue | null) => void
}

/** Preview + upload (click or drop a file) + remove. The image is uploaded at once; the form saves only its id. */
export function ImageUploadField({ id, label, hint, value, onChange }: ImageUploadFieldProps) {
  const { upload, isUploading, error } = useImageUpload(file => onChange({ id: file.id, url: file.url }))
  const [dragging, setDragging] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-4">
        <label
          htmlFor={id}
          onDragOver={event => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={event => {
            event.preventDefault()
            setDragging(false)
            if (!isUploading) upload(event.dataTransfer.files[0])
          }}
          className={cn(
            'relative grid size-24 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-lg border border-dashed bg-muted/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary',
            dragging && 'border-primary bg-accent text-primary',
            value && 'border-solid bg-background',
          )}
        >
          {value ? (
            <Image src={value.url} alt="" fill sizes="96px" className="object-contain p-1.5" />
          ) : (
            <ImageSquareIcon className="size-7" />
          )}
          {isUploading && (
            <span className="absolute inset-0 grid place-items-center bg-background/80">
              <CircleNotchIcon className="size-6 animate-spin text-primary" />
            </span>
          )}
        </label>
        <div className="flex flex-col items-start gap-2">
          <Button asChild variant="outline" size="sm">
            <label
              htmlFor={id}
              aria-disabled={isUploading}
              className="cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50"
            >
              <UploadSimpleIcon />
              {value ? 'Cambiar imagen' : 'Subir imagen'}
            </label>
          </Button>
          {value && (
            <Button type="button" variant="ghost" size="sm" disabled={isUploading} onClick={() => onChange(null)}>
              <TrashIcon />
              Quitar
            </Button>
          )}
        </div>
        <input
          id={id}
          type="file"
          // A label cannot be disabled: disabling the input is what stops a second upload while one is running.
          disabled={isUploading}
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="sr-only"
          onChange={event => {
            upload(event.target.files?.[0])
            event.target.value = ''
          }}
        />
      </div>
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          {hint ?? 'JPG, PNG, WebP o AVIF de hasta 5 MB. Podés arrastrarla.'}
        </p>
      )}
    </div>
  )
}
