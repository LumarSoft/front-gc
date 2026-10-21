import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/src/components/ui/button'

/** The way to a person: WhatsApp opens with the customer's question already written. */
export function AssistantHandoff({ url }: { url: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-surface p-4">
      <p className="text-sm font-semibold">Seguí la consulta con alguien del equipo</p>
      <p className="text-xs text-muted-foreground">Te abrimos WhatsApp con tu mensaje listo para enviar.</p>
      <Button asChild className="mt-1 h-10 self-start rounded-full px-4 font-bold">
        <a href={url} target="_blank" rel="noopener noreferrer">
          Escribir por WhatsApp
          <ArrowUpRight strokeWidth={2} aria-hidden />
        </a>
      </Button>
    </div>
  )
}
