import { ProcessDots } from '@/src/components/ui/print-marks'
import type { AssistantProduct } from '@/src/features/assistant/hooks/use-assistant'
import { PRODUCT_QUESTIONS, SAMPLE_QUESTIONS } from '@/src/features/assistant/lib/assistant-links'

type AssistantWelcomeProps = {
  /** The product page the chat was opened from: its questions replace the general ones. */
  product: AssistantProduct | null
  onAsk: (question: string) => void
}

export function AssistantWelcome({ product, onAsk }: AssistantWelcomeProps) {
  const questions = product ? PRODUCT_QUESTIONS : SAMPLE_QUESTIONS
  return (
    <div className="flex flex-1 flex-col gap-6 py-2">
      <div>
        <ProcessDots className="text-foreground" />
        <p className="mt-4 text-2xl leading-tight font-extrabold tracking-tight text-balance">
          {product ? `¿Qué querés saber de ${product.name}?` : 'Contanos qué necesitás imprimir'}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Te recomendamos productos de la tienda con precio y stock al día, y te ayudamos a comprarlos.
        </p>
      </div>
      <ol className="flex flex-col border-t">
        {questions.map((question, index) => (
          <li key={question} className="border-b">
            <button
              type="button"
              onClick={() => onAsk(question)}
              className="group flex w-full items-baseline gap-4 py-3 text-left text-sm font-medium transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
            >
              <span className="text-xs font-bold text-muted-foreground tabular-nums group-hover:text-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              {question}
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-auto text-xs text-muted-foreground">
        Respuestas automáticas sobre los productos y las compras en la tienda. Guardamos la conversación para mejorar el
        asesoramiento: no compartas datos personales sensibles.
      </p>
    </div>
  )
}
