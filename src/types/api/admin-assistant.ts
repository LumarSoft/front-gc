// Matches api-gc/docs/endpoints.md → Sales assistant (GET/POST /admin/assistant/*). "Asesor IA" in the admin.
import type { ProductStatus } from './admin-products'

/** Argentine calendar days, both included ("2026-10-21"). */
type Days = { from: string; to: string }

export type ConversationStatus = 'OPEN' | 'RESOLVED' | 'ESCALATED' | 'CLOSED'
export type QuestionStatus = 'OPEN' | 'ANSWERED' | 'DISMISSED'
export type AssistantMessageRole = 'USER' | 'ASSISTANT' | 'AGENT'

/** The signed-in customer who wrote; null for a guest. */
export type AssistantCustomer = { id: number; name: string; email: string }

export type AdminConversationListItem = {
  id: number
  status: ConversationStatus
  /** The customer's first message on one line, cut to 200 characters. */
  firstQuestion: string | null
  customer: AssistantCustomer | null
  customerMessages: number
  /** Unanswered questions of this conversation still open. */
  openQuestions: number
  escalationReason: string | null
  tokens: number
  /** Answers to look at: failed, cut, slow, or a search that found nothing. */
  problemAnswers: number
  /** Products added to the cart from this conversation's cards. */
  cartAdds: number
  createdAt: string
  lastMessageAt: string
}

export type AdminConversationsPage = {
  items: AdminConversationListItem[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

/** List query: the days are the ones the conversation started (Argentine calendar days). */
export type AdminConversationsQuery = {
  status?: ConversationStatus
  /** Only conversations with an answer to look at. */
  problems?: boolean
  q?: string
  range?: Days
  page?: number
  pageSize: number
}

/** A product an answer showed, as it is now in the catalog. */
export type AdminShownProduct = {
  id: number
  name: string
  slug: string
  status: ProductStatus
  archived: boolean
  imageUrl: string | null
}

export type AnswerOutcome = 'ANSWERED' | 'FAILED' | 'INTERRUPTED'
export type AnswerProblem = 'FAILED' | 'INTERRUPTED' | 'SLOW' | 'EMPTY_SEARCH'

/** One tool the assistant used for an answer; only the fields of that tool are present. */
export type ToolTrace = {
  tool: string
  text?: string | null
  category?: string | null
  use?: string | null
  maxPrice?: number | null
  sort?: string
  /** search_products: products found. show_products: cards shown. */
  results?: number
  partial?: boolean
  slug?: string | null
  missing?: string[]
  error?: boolean
}

export type AdminAssistantMessage = {
  id: number
  role: AssistantMessageRole
  content: string
  model: string | null
  inputTokens: number | null
  outputTokens: number | null
  products: AdminShownProduct[]
  /** Answers recorded from 2026-10-21; null on the customer's messages and older answers. */
  outcome: AnswerOutcome | null
  durationMs: number | null
  tools: ToolTrace[]
  problems: AnswerProblem[]
  createdAt: string
}

export type AdminCartAdd = { product: AdminShownProduct; variantId: number | null; createdAt: string }

export type AdminUnansweredQuestion = {
  id: number
  question: string
  status: QuestionStatus
  conversationId: number | null
  resolvedBy: { id: number; name: string } | null
  resolvedAt: string | null
  createdAt: string
}

export type AdminConversation = {
  id: number
  status: ConversationStatus
  customer: AssistantCustomer | null
  escalatedAt: string | null
  escalationReason: string | null
  inputTokens: number
  outputTokens: number
  createdAt: string
  lastMessageAt: string
  /** Oldest first. */
  messages: AdminAssistantMessage[]
  questions: AdminUnansweredQuestion[]
  /** Products added to the cart from its cards, oldest first. */
  cartAdds: AdminCartAdd[]
}

export type UnansweredQuestionsPage = {
  items: AdminUnansweredQuestion[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export type UnansweredQuestionsQuery = {
  /** Without it, every status. */
  status?: QuestionStatus
  q?: string
  page?: number
  pageSize: number
}

export type UnansweredQuestionCounts = Record<QuestionStatus, number>

export type QuestionStatusResult = { updated: number[]; unchanged: number[] }

export type AssistantUsageTotals = {
  conversations: number
  customerMessages: number
  inputTokens: number
  outputTokens: number
  /** Answers recorded with their outcome (from 2026-10-21) and, of them, the ones to look at. */
  answers: number
  problemAnswers: number
  /** Products added to the cart from the assistant's cards, and the conversations they came from. */
  cartAdds: number
  cartConversations: number
}

/** A search of the assistant that found nothing: a product to load or a word the search misses. */
export type AssistantEmptySearch = { text: string; searches: number; conversations: number; lastConversationId: number }

export type AssistantUsage = {
  period: Days
  /** One row per day, oldest first. */
  days: (AssistantUsageTotals & { day: string })[]
  totals: AssistantUsageTotals
  /** The current calendar month up to now. */
  month: AssistantUsageTotals & { from: string }
  today: { tokens: number; dailyLimit: number }
  /** The period's searches that found nothing, most repeated first (top 20). */
  emptySearches: AssistantEmptySearch[]
}
