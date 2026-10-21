'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import {
  getAdminConversation,
  getAdminConversations,
  getAssistantUsage,
  getUnansweredQuestionCounts,
  getUnansweredQuestions,
} from '@/src/services/admin-assistant.service'
import type { AdminConversationsQuery, UnansweredQuestionsQuery } from '@/src/types/api/admin-assistant'

/** Customers write at any time: the counters refresh every minute while the panel is open. */
const REFRESH_MS = 60_000

export function useAdminConversations(query: AdminConversationsQuery) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.assistantConversationList(query),
    queryFn: () => getAdminConversations(query),
    placeholderData: keepPreviousData,
  })
}

export function useAdminConversation(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.assistantConversation(id),
    queryFn: () => getAdminConversation(id),
  })
}

export function useUnansweredQuestions(query: UnansweredQuestionsQuery) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.assistantQuestionList(query),
    queryFn: () => getUnansweredQuestions(query),
    placeholderData: keepPreviousData,
  })
}

/** Questions per status: the list views and the "Asesor IA" badge (the ones still waiting). */
export function useUnansweredQuestionCounts() {
  return useQuery({
    queryKey: QUERY_KEYS.admin.assistantQuestionCounts,
    queryFn: getUnansweredQuestionCounts,
    refetchInterval: REFRESH_MS,
  })
}

export function useAssistantUsage(range: { from: string; to: string }) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.assistantUsage(range),
    queryFn: () => getAssistantUsage(range),
    placeholderData: keepPreviousData,
  })
}
