import Link from 'next/link'

export function AssistantLauncher() {
  return (
    <Link
      href="/asistente"
      className="group fixed right-4 bottom-4 z-30 flex items-center gap-2.5 rounded-full bg-foreground p-1.5 pr-5 text-sm font-bold text-background shadow-2xl shadow-navy/30 transition-transform hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
    >
      <span aria-hidden className="grid size-9 grid-cols-2 gap-0.5 rounded-full bg-background p-2">
        <span className="rounded-full bg-cyan" />
        <span className="rounded-full bg-magenta" />
        <span className="rounded-full bg-yellow" />
        <span className="rounded-full bg-foreground" />
      </span>
      <span>
        ¿Dudas?<span className="hidden sm:inline"> Te ayudamos a elegir</span>
      </span>
    </Link>
  )
}
