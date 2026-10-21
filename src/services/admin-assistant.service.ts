import { apiRequest } from '@/src/lib/api-client'
import type {
  AdminConversation,
  AdminConversationsPage,
  AdminConversationsQuery,
  AssistantUsage,
  QuestionStatus,
  QuestionStatusResult,
  UnansweredQuestionCounts,
  UnansweredQuestionsPage,
  UnansweredQuestionsQuery,
} from '@/src/types/api/admin-assistant'

export function getAdminConversations(query: AdminConversationsQuery): Promise<AdminConversationsPage> {
  const params = new URLSearchParams({ page: String(query.page ?? 1), pageSize: String(query.pageSize) })
  if (query.status) params.set('status', query.status)
  if (query.q) params.set('q', query.q)
  if (query.range) {
    params.set('from', query.range.from)
    params.set('to', query.range.to)
  }
  return apiRequest<AdminConversationsPage>(`/admin/assistant/conversations?${params}`)
}

export function getAdminConversation(id: number): Promise<AdminConversation> {
  return apiRequest<AdminConversation>(`/admin/assistant/conversations/${id}`)
}

export function getUnansweredQuestions(query: UnansweredQuestionsQuery): Promise<UnansweredQuestionsPage> {
  const params = new URLSearchParams({ page: String(query.page ?? 1), pageSize: String(query.pageSize) })
  if (query.status) params.set('status', query.status)
  if (query.q) params.set('q', query.q)
  return apiRequest<UnansweredQuestionsPage>(`/admin/assistant/questions?${params}`)
}

export function getUnansweredQuestionCounts(): Promise<UnansweredQuestionCounts> {
  return apiRequest<UnansweredQuestionCounts>('/admin/assistant/questions/counts')
}

/** One question or a selection: answered, dismissed or open again. */
export function changeQuestionStatus(ids: number[], status: QuestionStatus): Promise<QuestionStatusResult> {
  return apiRequest<QuestionStatusResult>('/admin/assistant/questions/status', {
    method: 'POST',
    body: { ids, status },
  })
}

/** `range`: Argentine calendar days, both included (the API defaults to the last 30 days). */
export function getAssistantUsage(range: { from: string; to: string }): Promise<AssistantUsage> {
  return apiRequest<AssistantUsage>(`/admin/assistant/usage?${new URLSearchParams(range)}`)
}
