import type { AssistantProductCard, AssistantStreamEvent } from '@/src/types/api/assistant'

/** Reads a newline-delimited JSON body line by line, as the bytes arrive. */
export async function* readJsonLines(body: ReadableStream<Uint8Array>): AsyncGenerator<unknown> {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      // `stream: true` keeps a character split between two chunks (ñ, á…) for the next one.
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) if (line.trim()) yield JSON.parse(line) as unknown
    }
    buffer += decoder.decode()
    if (buffer.trim()) yield JSON.parse(buffer) as unknown
  } finally {
    reader.releaseLock()
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/** Narrows one stream line to a known event; unknown or malformed lines are skipped (null). */
export function toStreamEvent(value: unknown): AssistantStreamEvent | null {
  if (!isRecord(value)) return null
  switch (value.type) {
    case 'conversation':
      return typeof value.token === 'string' ? { type: 'conversation', token: value.token } : null
    case 'status':
      return typeof value.text === 'string' && value.text.length <= 120 ? { type: 'status', text: value.text } : null
    case 'text':
      return typeof value.delta === 'string' ? { type: 'text', delta: value.delta } : null
    case 'products':
      return Array.isArray(value.items)
        ? { type: 'products', items: value.items.filter(isRecord) as AssistantProductCard[] }
        : null
    case 'handoff':
      return typeof value.url === 'string' && value.url.startsWith('https://wa.me/')
        ? { type: 'handoff', url: value.url }
        : null
    case 'error':
      return typeof value.message === 'string' ? { type: 'error', message: value.message } : null
    case 'done':
      return { type: 'done' }
    default:
      return null
  }
}
