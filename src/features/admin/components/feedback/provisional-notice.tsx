import { InfoIcon } from '@phosphor-icons/react/dist/ssr'

type ProvisionalNoticeProps = {
  children: React.ReactNode
}

/** Visible reminder that a feature is a stopgap (e.g. manual stock until Tango is connected). */
export function ProvisionalNotice({ children }: ProvisionalNoticeProps) {
  return (
    <div
      role="note"
      className="flex gap-2.5 rounded-lg border border-warning/30 bg-warning/5 p-3 text-xs text-foreground"
    >
      <InfoIcon className="mt-0.5 size-4 shrink-0 text-warning" />
      <div>{children}</div>
    </div>
  )
}
