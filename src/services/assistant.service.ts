import { readJsonLines, toStreamEvent } from '@/src/features/assistant/lib/assistant-stream'
import { ApiError, apiRequest, apiStream } from '@/src/lib/api-client'
import type { AssistantCartAddInput, AssistantMessageInput, AssistantStreamEvent } from '@/src/types/api/assistant'

/**
 * Browser-only: sends a message to the sales assistant and yields its answer as it is written. HTTP refusals (limits,
 * unknown conversation, assistant off) throw `ApiError` before the first event.
 */
export async function* streamAssistantAnswer(
  input: AssistantMessageInput,
  signal: AbortSignal,
): AsyncGenerator<AssistantStreamEvent> {
  const response = await apiStream('/assistant/messages', input, signal)
  if (!response.body) throw new ApiError(0, 'Network error')
  for await (const line of readJsonLines(response.body)) {
    const event = toStreamEvent(line)
    if (event) yield event
  }
}

/** Browser-only: a product of the assistant's cards went into the cart (for the admin's metrics; the cart is unchanged). */
export function recordAssistantCartAdd(input: AssistantCartAddInput): Promise<void> {
  return apiRequest<void>('/assistant/cart-adds', { method: 'POST', body: input })
}
