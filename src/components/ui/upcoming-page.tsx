import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { ProcessDots } from '@/src/components/ui/print-marks'

export type UpcomingAction = {
  label: string
  href: string
}

type UpcomingPageProps = {
  section: string
  title: string
  description: string
  /** Something true and useful the visitor can do today, while the section is not ready. */
  meanwhile?: React.ReactNode
  actions: UpcomingAction[]
}

/** A real route for a section whose content or feature is not ready yet: honest message plus a way forward. */
export function UpcomingPage({ section, title, description, meanwhile, actions }: UpcomingPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <p className="flex items-center gap-3 text-sm font-semibold text-primary">
        <ProcessDots />
        {section} · En preparación
      </p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{description}</p>
      {meanwhile && (
        <div className="mt-10 border-l-4 border-primary bg-surface p-5 sm:p-6">
          <p className="text-sm font-bold">Mientras tanto</p>
          <div className="mt-2 text-sm text-muted-foreground">{meanwhile}</div>
        </div>
      )}
      <div className="mt-10 flex flex-wrap gap-3">
        {actions.map((action, index) => (
          <Button
            key={action.href}
            asChild
            variant={index === 0 ? 'default' : 'outline'}
            className="h-11 rounded-full px-6"
          >
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
