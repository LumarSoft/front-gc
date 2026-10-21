'use client'

import { IndexFilters } from '@/src/features/admin/components/common/index-filters'
import { ViewTabs } from '@/src/features/admin/components/common/view-tabs'
import { useUnansweredQuestionCounts } from '@/src/features/admin/hooks/use-admin-assistant'
import { useQuestionListParams } from '@/src/features/admin/hooks/use-question-list-params'
import { QUESTION_VIEWS } from '@/src/features/admin/lib/assistant-display'

/** Status views (the ones still waiting with their count) and the search in the questions. */
export function QuestionsFilters() {
  const { query, update, hasSearch } = useQuestionListParams()
  const { data: counts } = useUnansweredQuestionCounts()
  const views = QUESTION_VIEWS.map(view => ({ ...view, count: view.value === 'OPEN' ? counts?.OPEN : undefined }))

  return (
    <IndexFilters
      views={<ViewTabs label="Estado" options={views} value={query.status} onChange={status => update({ status })} />}
      search={{
        value: query.q ?? '',
        onSearch: q => update({ q: q || undefined }),
        placeholder: 'Buscá en las preguntas',
        label: 'Buscar preguntas',
      }}
      hasFilters={hasSearch}
      onClearAll={() => update({ q: undefined })}
    />
  )
}
