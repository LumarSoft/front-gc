'use client'

import { ArrowLeftIcon, ArrowRightIcon, StarIcon, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import type { GalleryItem } from '@/src/features/admin/lib/gallery-draft'

type GalleryTileProps = {
  item: GalleryItem
  index: number
  total: number
  onMove: (offset: number) => void
  onMakeMain: () => void
  onRemove: () => void
  onAltText: (text: string) => void
}

/** One photo with its order controls and the text read by screen readers and Google. */
export function GalleryTile({ item, index, total, onMove, onMakeMain, onRemove, onAltText }: GalleryTileProps) {
  const label = `imagen ${index + 1}`
  return (
    <li className="flex flex-col gap-2">
      <div className="group relative aspect-square overflow-hidden rounded-lg border bg-background">
        <Image
          src={item.url}
          alt={item.altText}
          fill
          sizes="(min-width: 1024px) 180px, 45vw"
          className="object-contain p-2"
        />
        {index === 0 && (
          <span className="absolute top-2 left-2 rounded-md bg-primary px-1.5 py-0.5 text-xs font-medium text-primary-foreground">
            Principal
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 bg-background/90 p-1 backdrop-blur-sm">
          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Mover ${label} antes`}
              disabled={index === 0}
              onClick={() => onMove(-1)}
            >
              <ArrowLeftIcon />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Mover ${label} después`}
              disabled={index === total - 1}
              onClick={() => onMove(1)}
            >
              <ArrowRightIcon />
            </Button>
          </div>
          <div className="flex gap-1">
            {index > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Usar ${label} como principal`}
                onClick={onMakeMain}
              >
                <StarIcon />
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Quitar ${label}`}
              onClick={onRemove}
              className="text-destructive"
            >
              <Trash2Icon />
            </Button>
          </div>
        </div>
      </div>
      <Input
        aria-label={`Texto alternativo de la ${label}`}
        placeholder="Texto alternativo"
        value={item.altText}
        maxLength={200}
        onChange={event => onAltText(event.target.value)}
        className="h-8 text-xs"
      />
    </li>
  )
}
