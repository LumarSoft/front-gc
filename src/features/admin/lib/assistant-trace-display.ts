import type { BadgeTone } from '@/src/features/admin/components/common/tone-badge'
import type { AnswerProblem, ToolTrace } from '@/src/types/api/admin-assistant'

/** Why an answer is worth a look, as a badge. */
export const ANSWER_PROBLEM_BADGE: Record<AnswerProblem, { label: string; tone: BadgeTone }> = {
  FAILED: { label: 'Falló', tone: 'critical' },
  INTERRUPTED: { label: 'El cliente se fue', tone: 'warning' },
  SLOW: { label: 'Lenta', tone: 'attention' },
  EMPTY_SEARCH: { label: 'Búsqueda sin resultados', tone: 'attention' },
}

const seconds = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 })
const pesos = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

/** "8,2 s", or "1 min 14 s" past a minute. */
export function formatDuration(ms: number): string {
  if (ms < 60_000) return `${seconds.format(ms / 1000)} s`
  const total = Math.round(ms / 1000)
  return `${Math.floor(total / 60)} min ${total % 60} s`
}

const plural = (count: number, one: string, many: string): string => `${count} ${count === 1 ? one : many}`

/** One step of how the assistant answered, in a line: what it looked for and what came back. */
export function describeTool(trace: ToolTrace): string {
  switch (trace.tool) {
    case 'search_products': {
      const what = [
        trace.text ? `«${trace.text}»` : 'productos',
        trace.category && `en ${trace.category}`,
        trace.use && `para ${trace.use}`,
        trace.maxPrice && `hasta ${pesos.format(trace.maxPrice)}`,
        trace.sort === 'price-asc' && 'del más barato',
        trace.sort === 'price-desc' && 'del más caro',
      ].filter(Boolean)
      const found =
        trace.error || trace.results === undefined
          ? 'no pudo buscar'
          : trace.results === 0
            ? 'no encontró nada'
            : `${plural(trace.results, 'producto', 'productos')}${trace.partial ? ', con algunas de las palabras' : ''}`
      return `Buscó ${what.join(' ')} → ${found}`
    }
    case 'get_product':
      return `Leyó la ficha de ${trace.slug ?? 'un producto'}${trace.error ? ' → no está publicada' : ''}`
    case 'show_products': {
      const missing = trace.missing?.length ? ` (sin publicar: ${trace.missing.join(', ')})` : ''
      return `Mostró ${plural(trace.results ?? 0, 'tarjeta', 'tarjetas')}${missing}`
    }
    case 'offer_replies':
      return trace.error
        ? 'Intentó ofrecer respuestas rápidas → no eran válidas'
        : `Ofreció respuestas rápidas: ${trace.options?.map(option => `«${option}»`).join(' · ') || 'ninguna'}`
    case 'record_unanswered_question':
      return 'Anotó una pregunta que no pudo responder'
    case 'contact_team':
      return trace.error ? 'Intentó derivar al equipo → no pudo' : 'Ofreció hablar con el equipo'
    default:
      return `Usó ${trace.tool}${trace.error ? ' → error' : ''}`
  }
}

/** A step that went wrong: shown in the attention color. */
export const toolFailed = (trace: ToolTrace): boolean =>
  Boolean(trace.error) || (trace.tool === 'search_products' && trace.results === 0)
