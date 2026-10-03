import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { ProcessDots } from '@/src/components/ui/print-marks'

const SAMPLE_QUESTIONS = [
  '¿Qué impresora me conviene para fotos?',
  '¿Qué tinta usa mi L3250?',
  '¿Cuál imprime más barato por hoja?',
  '¿Llega a Córdoba? ¿Cuánto tarda?',
]

export function AssistantTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-24">
      <div className="grid items-center gap-10 rounded-4xl bg-surface p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
        <div className="reveal">
          <p className="text-sm font-semibold text-primary">Asesor online</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Preguntá lo que quieras, a la hora que quieras
          </h2>
          <p className="mt-4 text-muted-foreground">
            Diferencias entre modelos, consumibles compatibles, precios y disponibilidad. Te responde al instante y, si
            hace falta, te pasa con alguien del equipo.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {SAMPLE_QUESTIONS.map(question => (
              <li key={question}>
                <Link
                  href={`/asistente?pregunta=${encodeURIComponent(question)}`}
                  className="inline-flex rounded-full border bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  {question}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-8 h-12 rounded-full px-6 text-base font-bold">
            <Link href="/asistente">Hacé tu consulta</Link>
          </Button>
        </div>

        {/* Illustrative conversation — not real data. */}
        <div
          aria-hidden
          className="reveal mx-auto flex w-full max-w-md -rotate-1 flex-col gap-3 rounded-3xl bg-background p-5 shadow-xl shadow-navy/5"
        >
          <div className="flex items-center gap-3 border-b pb-4">
            <span className="grid size-10 place-items-center rounded-full bg-foreground text-xs font-extrabold text-background">
              CG
            </span>
            <span className="flex-1">
              <span className="block text-sm font-bold">Asesor de Comunicaciones Gráficas</span>
              <span className="block text-xs text-muted-foreground">Responde al instante</span>
            </span>
            <ProcessDots className="text-foreground" />
          </div>
          <p className="ml-auto max-w-xs rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm text-primary-foreground">
            Quiero imprimir fotos de mi emprendimiento en casa. ¿Qué me recomendás?
          </p>
          <p className="max-w-xs rounded-2xl rounded-bl-sm bg-muted px-4 py-3 text-sm">
            Para fotos te conviene una EcoTank de 6 colores como la L8180: imprime hasta A3+ y tiene un costo por foto
            muy bajo. ¿Querés que la compare con otra opción?
          </p>
          <p className="ml-auto max-w-xs rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm text-primary-foreground">
            ¡Sí! Y decime qué papel usar.
          </p>
          <p className="text-xs text-muted-foreground italic">escribiendo…</p>
        </div>
      </div>
    </section>
  )
}
