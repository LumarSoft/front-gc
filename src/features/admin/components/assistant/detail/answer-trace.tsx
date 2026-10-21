import { ChevronRightIcon } from 'lucide-react'
import { ToneBadge } from '@/src/features/admin/components/common/tone-badge'
import { ANSWER_PROBLEM_BADGE, describeTool, toolFailed } from '@/src/features/admin/lib/assistant-trace-display'
import { cn } from '@/src/lib/utils'
import type { AdminAssistantMessage } from '@/src/types/api/admin-assistant'

/**
 * How an answer went: why it is worth a look (if it is) and, folded, the steps it took (what it searched, how many
 * products it found, the sheets it read, the cards it showed). Nothing for answers recorded before 2026-10-21.
 */
export function AnswerTrace({ message }: { message: AdminAssistantMessage }) {
  if (message.outcome === null) return null
  return (
    <div className="flex flex-col gap-1.5">
      {message.problems.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {message.problems.map(problem => (
            <ToneBadge key={problem} tone={ANSWER_PROBLEM_BADGE[problem].tone}>
              {ANSWER_PROBLEM_BADGE[problem].label}
            </ToneBadge>
          ))}
        </div>
      )}
      {message.tools.length > 0 && (
        <details className="group text-xs">
          <summary className="flex w-fit cursor-pointer list-none items-center gap-1 rounded text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
            <ChevronRightIcon className="size-3.5 transition-transform group-open:rotate-90" aria-hidden />
            Cómo respondió · {message.tools.length === 1 ? '1 paso' : `${message.tools.length} pasos`}
          </summary>
          <ol className="mt-1.5 ml-1.5 flex flex-col gap-1 border-l pl-3">
            {message.tools.map((tool, index) => (
              <li
                key={index}
                className={cn('break-words', toolFailed(tool) && 'font-medium text-tone-attention-foreground')}
              >
                {describeTool(tool)}
              </li>
            ))}
          </ol>
        </details>
      )}
    </div>
  )
}
