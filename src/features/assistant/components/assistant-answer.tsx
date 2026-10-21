import { Button } from '@/src/components/ui/button'
import { AssistantHandoff } from '@/src/features/assistant/components/assistant-handoff'
import { AssistantProductCard } from '@/src/features/assistant/components/assistant-product-card'
import { AssistantRichText } from '@/src/features/assistant/components/assistant-rich-text'
import { AssistantTyping } from '@/src/features/assistant/components/assistant-typing'
import type { ChatMessage } from '@/src/features/assistant/lib/assistant-conversation'

type AssistantAnswerProps = {
  answer: Extract<ChatMessage, { role: 'assistant' }>
  onRetry: () => void
  onRestart: () => void
  onNavigate: () => void
}

/** One answer: text, product cards and the way to a person, in the order the assistant wrote them. */
export function AssistantAnswer({ answer, onRetry, onRestart, onNavigate }: AssistantAnswerProps) {
  return (
    <div className="flex flex-col gap-3">
      {answer.parts.map((part, index) => {
        if (part.type === 'text') return <AssistantRichText key={index} text={part.text} onNavigate={onNavigate} />
        if (part.type === 'handoff') return <AssistantHandoff key={index} url={part.url} />
        return (
          <ul key={index} aria-label="Productos recomendados" className="flex flex-col gap-2">
            {part.items.map((product, position) => (
              <li key={product.id}>
                <AssistantProductCard product={product} position={position + 1} onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
        )
      })}
      {answer.pending && <AssistantTyping />}
      {answer.problem && (
        <div role="alert" className="flex flex-col items-start gap-2 rounded-2xl border border-destructive/20 p-3">
          <p className="text-sm text-destructive">{answer.problem.message}</p>
          {answer.problem.fix === 'retry' ? (
            <Button variant="outline" size="sm" onClick={onRetry} className="h-8 rounded-full px-3.5 text-xs">
              Reintentar
            </Button>
          ) : (
            <Button size="sm" onClick={onRestart} className="h-8 rounded-full px-3.5 text-xs font-bold">
              Empezar una consulta nueva
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
