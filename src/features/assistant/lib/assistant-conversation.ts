import type { AssistantProductCard, AssistantStreamEvent } from '@/src/types/api/assistant'

/** A piece of an answer, in the order the assistant produced it. */
export type AnswerPart =
  | { type: 'text'; text: string }
  | { type: 'products'; items: AssistantProductCard[] }
  | { type: 'handoff'; url: string }

/** Why an answer could not be completed: a retry helps, or the conversation has to start over. */
export type AnswerProblem = { message: string; fix: 'retry' | 'restart' }

export type ChatMessage =
  | { id: string; role: 'user'; text: string }
  | {
      id: string
      role: 'assistant'
      parts: AnswerPart[]
      pending: boolean
      problem: AnswerProblem | null
      /** What it is doing right now, while nothing new is being written. Absent in conversations saved before it. */
      activity?: string | null
    }

export type Conversation = {
  /** Token that continues the conversation in the API; null until the first answer starts. */
  token: string | null
  messages: ChatMessage[]
}

export type ConversationAction =
  | { type: 'asked'; id: string; text: string }
  | { type: 'event'; event: AssistantStreamEvent }
  | { type: 'failed'; problem: AnswerProblem }
  | { type: 'retried' }
  | { type: 'reset' }

export const EMPTY_CONVERSATION: Conversation = { token: null, messages: [] }

export function conversationReducer(state: Conversation, action: ConversationAction): Conversation {
  switch (action.type) {
    case 'asked':
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: action.id, role: 'user', text: action.text },
          { id: `${action.id}-answer`, role: 'assistant', parts: [], pending: true, problem: null, activity: null },
        ],
      }
    case 'event':
      if (action.event.type === 'conversation') return { ...state, token: action.event.token }
      return { ...state, messages: updateAnswer(state.messages, answer => applyEvent(answer, action.event)) }
    case 'failed':
      return {
        ...state,
        // A conversation the API no longer knows cannot be continued: forget its token.
        token: action.problem.fix === 'restart' ? null : state.token,
        messages: updateAnswer(state.messages, answer => ({ ...answer, pending: false, problem: action.problem })),
      }
    case 'retried':
      return {
        ...state,
        messages: updateAnswer(state.messages, answer => ({
          ...answer,
          parts: [],
          pending: true,
          problem: null,
          activity: null,
        })),
      }
    case 'reset':
      return EMPTY_CONVERSATION
  }
}

export type Answer = Extract<ChatMessage, { role: 'assistant' }>

function updateAnswer(messages: ChatMessage[], update: (answer: Answer) => Answer): ChatMessage[] {
  const last = messages.at(-1)
  if (last?.role !== 'assistant') return messages
  return [...messages.slice(0, -1), update(last)]
}

function applyEvent(answer: Answer, event: AssistantStreamEvent): Answer {
  // Anything shown replaces the status line: it described the wait that just ended.
  const shown = event.type === 'status' ? answer : { ...answer, activity: null }
  return applyShown(shown, event)
}

function applyShown(answer: Answer, event: AssistantStreamEvent): Answer {
  switch (event.type) {
    case 'status':
      return { ...answer, activity: event.text }
    case 'text': {
      const last = answer.parts.at(-1)
      const parts: AnswerPart[] =
        last?.type === 'text'
          ? [...answer.parts.slice(0, -1), { type: 'text', text: last.text + event.delta }]
          : [...answer.parts, { type: 'text', text: event.delta }]
      return { ...answer, parts }
    }
    case 'products':
      return event.items.length ? { ...answer, parts: [...answer.parts, event] } : answer
    case 'handoff':
      return { ...answer, parts: [...answer.parts, event] }
    case 'error':
      return { ...answer, problem: { message: event.message, fix: 'retry' } }
    case 'done':
      return { ...answer, pending: false }
    default:
      return answer
  }
}

/** The customer's last question, to send it again after a failed answer. */
export function lastQuestion(conversation: Conversation): string | null {
  const question = conversation.messages.findLast(message => message.role === 'user')
  return question?.role === 'user' ? question.text : null
}

export function isAnswering(conversation: Conversation): boolean {
  const last = conversation.messages.at(-1)
  return last?.role === 'assistant' && last.pending
}

/** What the waiting line says under an answer in progress, or `writing` when the text itself shows the progress. */
export function answerActivity(answer: Answer): { label: string | null; writing: boolean } {
  if (!answer.pending) return { label: null, writing: false }
  if (answer.activity) return { label: answer.activity, writing: false }
  const last = answer.parts.at(-1)
  if (!last) return { label: 'Leyendo tu consulta…', writing: false }
  if (last.type === 'text') return { label: null, writing: true }
  return { label: 'Escribiendo la respuesta…', writing: false }
}

/** The conversation reached its limit: only a new one can continue. */
export function needsRestart(conversation: Conversation): boolean {
  const last = conversation.messages.at(-1)
  return last?.role === 'assistant' && last.problem?.fix === 'restart'
}
