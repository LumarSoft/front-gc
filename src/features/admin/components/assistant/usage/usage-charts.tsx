import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { AreaChart } from '@/src/features/admin/components/dashboard/area-chart'
import { formatCount, formatTokens } from '@/src/features/admin/lib/assistant-display'
import { formatDay } from '@/src/features/admin/lib/dashboard-metrics'
import type { AssistantUsage } from '@/src/types/api/admin-assistant'

/** Conversations started and tokens used, day by day. */
export function UsageCharts({ usage }: { usage: AssistantUsage }) {
  const labels = usage.days.map(day => formatDay(day.day))
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <AdminCard title="Conversaciones por día">
        <AreaChart
          title="Conversaciones que empezaron cada día"
          values={usage.days.map(day => day.conversations)}
          labels={labels}
          formatValue={value => formatCount(value)}
        />
      </AdminCard>
      <AdminCard title="Tokens por día">
        <AreaChart
          title="Tokens que usó el asesor cada día"
          values={usage.days.map(day => day.inputTokens + day.outputTokens)}
          labels={labels}
          formatValue={value => `${formatCount(value)} tokens`}
          formatAxis={formatTokens}
        />
      </AdminCard>
    </div>
  )
}
