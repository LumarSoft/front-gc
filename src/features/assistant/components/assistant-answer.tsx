import { Button } from '@/src/components/ui/button'
import { AssistantAvatar } from '@/src/features/assistant/components/assistant-avatar'
import { AssistantHandoff } from '@/src/features/assistant/components/assistant-handoff'
import { AssistantProductCard } from '@/src/features/assistant/components/assistant-product-card'
import { AssistantRichText } from '@/src/features/assistant/components/assistant-rich-text'
import { AssistantTyping } from '@/src/features/assistant/components/assistant-typing'
import { answerActivity, type Answer, type AnswerProblem } from '@/src/features/assistant/lib/assistant-conversation'
import { cn } from '@/src/lib/utils'

type AssistantAnswerProps = {
  answer: Answer
  onRetry: () => void
  onRestart: () => void
  onNavigate: () => void
}

/** Pieces of an answer enter softly; cards one after the other. */
const ENTER = 'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 duration-300'

/**
 * One answer next to the store's logo: text, product cards and the way to a person, in the order the assistant wrote
 * them, and what it is doing while the customer waits.
 */
export function AssistantAnswer({ answer, onRetry, onRestart, onNavigate }: AssistantAnswerProps) {
  const activity = answerActivity(answer)
  return (
    <div className="flex gap-2.5">
      <AssistantAvatar busy={answer.pending} />
      <div className="flex min-w-0 flex-1 flex-col gap-3 pt-1">
        {answer.parts.map((part, index) => {
          const last = index === answer.parts.length - 1
          if (part.type === 'text')
            return (
              <AssistantRichText
                key={index}
                text={part.text}
                onNavigate={onNavigate}
                writing={last && activity.writing}
              />
            )
          if (part.type === 'handoff')
            return (
              <div key={index} className={ENTER}>
                <AssistantHandoff url={part.url} />
              </div>
            )
          return (
            <ul key={index} aria-label="Productos recomendados" className="flex flex-col gap-2">
              {part.items.map((product, position) => (
                <li
                  key={product.id}
                  className={cn(ENTER, 'fill-mode-both')}
                  style={{ animationDelay: `${position * 90}ms` }}
                >
                  <AssistantProductCard product={product} position={position + 1} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          )
        })}
        {activity.label && <AssistantTyping label={activity.label} />}
        {answer.problem && <AnswerProblemNotice problem={answer.problem} onRetry={onRetry} onRestart={onRestart} />}
      </div>
    </div>
  )
}

type AnswerProblemNoticeProps = { problem: AnswerProblem; onRetry: () => void; onRestart: () => void }

function AnswerProblemNotice({ problem, onRetry, onRestart }: AnswerProblemNoticeProps) {
  return (
    <div role="alert" className="flex flex-col items-start gap-2 rounded-2xl border border-destructive/20 p-3">
      <p className="text-sm text-destructive">{problem.message}</p>
      {problem.fix === 'retry' ? (
        <Button variant="outline" size="sm" onClick={onRetry} className="h-8 rounded-full px-3.5 text-xs">
          Reintentar
        </Button>
      ) : (
        <Button size="sm" onClick={onRestart} className="h-8 rounded-full px-3.5 text-xs font-bold">
          Empezar una consulta nueva
        </Button>
      )}
    </div>
  )
}
