import { ToneBadge, type BadgeTone } from '@/src/features/admin/components/common/tone-badge'

type SystemIntegrationProps = {
  name: string
  state: { label: string; tone: BadgeTone }
  children: React.ReactNode
}

/** One external service: its name and state, then what it is set up with and when it was last used. */
export function SystemIntegration({ name, state, children }: SystemIntegrationProps) {
  return (
    <section className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold">{name}</h3>
        <ToneBadge tone={state.tone}>{state.label}</ToneBadge>
      </div>
      {children}
    </section>
  )
}
