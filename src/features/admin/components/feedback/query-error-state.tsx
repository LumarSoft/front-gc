import { CircleAlertIcon, RotateCwIcon } from 'lucide-react'
import { Button } from '@/src/components/ui/button'

type QueryErrorStateProps = {
  message?: string
  onRetry: () => void
}

/** Inline error for a block whose data failed to load: what happened and a way to retry. */
export function QueryErrorState({ message = 'No pudimos cargar esta información.', onRetry }: QueryErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-start gap-3 p-4 text-sm sm:flex-row sm:items-center">
      <CircleAlertIcon className="size-5 shrink-0 text-destructive" />
      <p className="flex-1">{message} Revisá tu conexión y probá de nuevo.</p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        <RotateCwIcon className="size-4" />
        Reintentar
      </Button>
    </div>
  )
}
