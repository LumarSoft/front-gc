import Link from 'next/link'
import { Card } from '@/src/components/ui/card'
import { UsageTile } from '@/src/features/admin/components/assistant/usage/usage-tile'
import { formatCount } from '@/src/features/admin/lib/assistant-display'
import type { AssistantUsage } from '@/src/types/api/admin-assistant'

const percent = new Intl.NumberFormat('es-AR', { style: 'percent', maximumFractionDigits: 0 })
const share = (part: number, whole: number): string => (whole > 0 ? percent.format(part / whole) : '—')

/** What the assistant sold (conversations that led to the cart) and how many of its answers need a look. */
export function OutcomeKpis({ usage }: { usage: AssistantUsage }) {
  const { totals, period } = usage
  const toReview = `/admin/asistente?revisar=1&desde=${period.from}&hasta=${period.to}`

  return (
    <Card className="grid gap-0 divide-border py-0 sm:grid-cols-3 sm:divide-x max-sm:divide-y">
      <UsageTile
        label="Conversaciones que agregaron al carrito"
        value={formatCount(totals.cartConversations)}
        hint={`${share(totals.cartConversations, totals.conversations)} de las conversaciones`}
      />
      <UsageTile
        label="Productos agregados desde el chat"
        value={formatCount(totals.cartAdds)}
        hint="con el botón de las tarjetas del asesor"
      />
      <UsageTile
        label="Respuestas para revisar"
        value={formatCount(totals.problemAnswers)}
        hint={`${share(totals.problemAnswers, totals.answers)} de ${formatCount(totals.answers)} respuestas`}
      >
        {totals.problemAnswers > 0 && (
          <Link href={toReview} className="w-fit text-xs font-medium text-primary hover:underline">
            Ver conversaciones
          </Link>
        )}
      </UsageTile>
    </Card>
  )
}
