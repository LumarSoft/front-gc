import type { Icon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { EmptyState } from '@/src/components/ui/empty-state'

type NoMatchesProps = {
  icon: Icon
  /** "Ninguna categoría coincide". */
  title: string
  onClear: () => void
}

/** Empty state of a filtered list: nothing matches the view or search, with a way back to everything. */
export function NoMatches({ icon: IconComponent, title, onClear }: NoMatchesProps) {
  return (
    <EmptyState
      icon={<IconComponent />}
      title={title}
      description="Probá con otra búsqueda o mirá la lista completa."
      action={
        <Button variant="outline" onClick={onClear}>
          Ver todo
        </Button>
      }
    />
  )
}
