import { DailyLimitMeter } from '@/src/features/admin/components/assistant/usage/daily-limit-meter'
import { UsageTile } from '@/src/features/admin/components/assistant/usage/usage-tile'
import { Card } from '@/src/components/ui/card'
import { formatCount, formatTokens } from '@/src/features/admin/lib/assistant-display'
import { formatDay } from '@/src/features/admin/lib/dashboard-metrics'
import type { AssistantUsage } from '@/src/types/api/admin-assistant'

const plural = (count: number, one: string, many: string): string => `${formatCount(count)} ${count === 1 ? one : many}`

/** The period's totals, the month so far (the monthly fee includes a number of conversations) and today's limit. */
export function UsageKpis({ usage }: { usage: AssistantUsage }) {
  const { totals, month, today } = usage
  const monthTokens = month.inputTokens + month.outputTokens

  return (
    <Card className="grid grid-cols-2 gap-0 divide-border py-0 lg:grid-cols-4 lg:divide-x max-lg:[&>*:nth-child(-n+2)]:border-b max-lg:[&>*:nth-child(odd)]:border-r">
      <UsageTile
        label="Conversaciones"
        value={formatCount(totals.conversations)}
        hint={plural(totals.customerMessages, 'mensaje de clientes', 'mensajes de clientes')}
      />
      <UsageTile
        label="Tokens"
        value={formatTokens(totals.inputTokens + totals.outputTokens)}
        hint={`${formatTokens(totals.inputTokens)} de entrada · ${formatTokens(totals.outputTokens)} de salida`}
      />
      <UsageTile
        label="Conversaciones este mes"
        value={formatCount(month.conversations)}
        hint={`desde el ${formatDay(month.from)} · ${formatTokens(monthTokens)} tokens`}
      />
      <UsageTile
        label="Hoy"
        value={formatTokens(today.tokens)}
        hint={`tokens de ${formatTokens(today.dailyLimit)} por día`}
      >
        <DailyLimitMeter used={today.tokens} limit={today.dailyLimit} />
      </UsageTile>
    </Card>
  )
}
