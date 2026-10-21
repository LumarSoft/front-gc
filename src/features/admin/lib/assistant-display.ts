import type { BadgeTone } from '@/src/features/admin/components/common/tone-badge'
import { formatOrderDate } from '@/src/features/admin/lib/relative-date'
import type {
  AdminAssistantMessage,
  AdminConversationsQuery,
  AssistantCustomer,
  AssistantMessageRole,
  QuestionStatus,
} from '@/src/types/api/admin-assistant'

export type ConversationView = 'all' | 'escalated' | 'problems'

/**
 * Saved views of the conversation list: every conversation, the ones where the assistant offered a person, and the
 * ones with an answer to look at (it failed, the customer left, it was slow or a search found nothing).
 */
export const CONVERSATION_VIEWS: { value: ConversationView; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'escalated', label: 'Derivadas' },
  { value: 'problems', label: 'Para revisar' },
]

export function conversationView(query: AdminConversationsQuery): ConversationView {
  if (query.problems) return 'problems'
  return query.status === 'ESCALATED' ? 'escalated' : 'all'
}

/** The list query of a saved view. */
export const conversationViewQuery = (view: ConversationView): Partial<AdminConversationsQuery> => ({
  status: view === 'escalated' ? 'ESCALATED' : undefined,
  problems: view === 'problems' || undefined,
})

/** Saved views of the unanswered questions; the list opens on the ones still waiting. */
export const QUESTION_VIEWS: { value: QuestionStatus | undefined; label: string }[] = [
  { value: 'OPEN', label: 'Sin responder' },
  { value: 'ANSWERED', label: 'Respondidas' },
  { value: 'DISMISSED', label: 'Descartadas' },
  { value: undefined, label: 'Todas' },
]

export const QUESTION_STATUS_BADGE: Record<QuestionStatus, { label: string; tone: BadgeTone }> = {
  OPEN: { label: 'Sin responder', tone: 'attention' },
  ANSWERED: { label: 'Respondida', tone: 'success' },
  DISMISSED: { label: 'Descartada', tone: 'neutral' },
}

export const MESSAGE_AUTHOR: Record<AssistantMessageRole, string> = {
  USER: 'Cliente',
  ASSISTANT: 'Asesor IA',
  AGENT: 'Equipo',
}

/** A question cut to 60 characters, to name its row (checkbox labels) without reading it all. */
export const questionLabel = (question: string): string =>
  question.length > 60 ? `${question.slice(0, 59).trimEnd()}…` : question

/** "Ana Pérez" or "Invitado" for someone who wrote without signing in. */
export const customerName = (customer: AssistantCustomer | null): string =>
  customer ? customer.name || customer.email : 'Invitado'

const count = new Intl.NumberFormat('es-AR')
const compact = new Intl.NumberFormat('es-AR', { notation: 'compact', maximumFractionDigits: 1 })

export const formatCount = (value: number): string => count.format(value)

/** "18,5 k" for big numbers, exact below ten thousand. */
export const formatTokens = (value: number): string => (value >= 10_000 ? compact : count).format(value)

const time = new Intl.DateTimeFormat('es-AR', {
  hour: 'numeric',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZone: 'America/Argentina/Buenos_Aires',
})
const dayKey = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' })

/**
 * When each message was written: the full date on the first one and whenever the day changes ("Hoy a las 14:02"),
 * only the time otherwise ("14:05").
 */
export function messageTimes(messages: Pick<AdminAssistantMessage, 'createdAt'>[]): string[] {
  return messages.map((message, index) => {
    const date = new Date(message.createdAt)
    const previous = messages[index - 1]
    return previous && dayKey.format(new Date(previous.createdAt)) === dayKey.format(date)
      ? time.format(date)
      : formatOrderDate(message.createdAt)
  })
}
