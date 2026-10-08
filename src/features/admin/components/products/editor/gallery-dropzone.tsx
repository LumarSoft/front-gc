'use client'

import { LoaderCircleIcon, UploadIcon } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/src/lib/utils'

type GalleryDropzoneProps = {
  onFiles: (files: File[]) => void
  uploading: boolean
  remaining: number
}

/** "Agregar imágenes": click to pick several files or drop them here. */
export function GalleryDropzone({ onFiles, uploading, remaining }: GalleryDropzoneProps) {
  const [dragging, setDragging] = useState(false)
  return (
    <li>
      <label
        onDragOver={event => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={event => {
          event.preventDefault()
          setDragging(false)
          if (!uploading) onFiles([...event.dataTransfer.files])
        }}
        className={cn(
          'flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/40 p-3 text-center text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary',
          dragging && 'border-primary bg-accent text-primary',
          uploading && 'pointer-events-none',
        )}
      >
        {uploading ? (
          <>
            <LoaderCircleIcon className="size-6 animate-spin text-primary" />
            Subiendo {remaining}…
          </>
        ) : (
          <>
            <UploadIcon className="size-6" />
            Agregar imágenes
            <span className="text-muted-foreground">o arrastralas acá</span>
          </>
        )}
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="sr-only"
          disabled={uploading}
          onChange={event => {
            onFiles([...(event.target.files ?? [])])
            event.target.value = ''
          }}
        />
      </label>
    </li>
  )
}
