import { RotateCcw, X } from 'lucide-react'
import { BrandLogoImage } from '@/src/components/layout/brand-logo-image'
import { Button } from '@/src/components/ui/button'

type AssistantHeaderProps = {
  onClose: () => void
  /** Absent while there is nothing to start over. */
  onRestart?: () => void
}

export function AssistantHeader({ onClose, onRestart }: AssistantHeaderProps) {
  return (
    <header className="flex shrink-0 items-center gap-3 border-b px-4 py-3 sm:px-5">
      <span aria-hidden className="flex h-9 items-center rounded-full bg-surface px-2.5">
        <BrandLogoImage className="h-4" />
      </span>
      <div className="min-w-0 flex-1">
        <h2 id="assistant-title" className="truncate text-sm leading-tight font-extrabold">
          Te ayudamos a elegir
        </h2>
        <p className="truncate text-xs text-muted-foreground">Asesor online de la tienda</p>
      </div>
      {onRestart && (
        <Button
          variant="ghost"
          size="icon-lg"
          onClick={onRestart}
          className="rounded-full"
          aria-label="Empezar una consulta nueva"
          title="Empezar una consulta nueva"
        >
          <RotateCcw strokeWidth={1.75} className="size-4.5" />
        </Button>
      )}
      <Button variant="ghost" size="icon-lg" onClick={onClose} className="rounded-full" aria-label="Cerrar el asesor">
        <X strokeWidth={1.75} className="size-5" />
      </Button>
    </header>
  )
}
