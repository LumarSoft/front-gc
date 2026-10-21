'use client'

import { DateFilterPill } from '@/src/features/admin/components/common/date-filter-pill'
import { IndexFilters } from '@/src/features/admin/components/common/index-filters'
import { ViewTabs } from '@/src/features/admin/components/common/view-tabs'
import { useConversationListParams } from '@/src/features/admin/hooks/use-conversation-list-params'
import { CONVERSATION_VIEWS, conversationView, conversationViewQuery } from '@/src/features/admin/lib/assistant-display'

/** Every conversation, the ones handed off or to look at; search in what was said, and the days they started. */
export function ConversationsFilters() {
  const { query, update, hasFilters } = useConversationListParams()

  return (
    <IndexFilters
      views={
        <ViewTabs
          label="Estado"
          options={CONVERSATION_VIEWS}
          value={conversationView(query)}
          onChange={view => update(conversationViewQuery(view))}
        />
      }
      search={{
        value: query.q ?? '',
        onSearch: q => update({ q: q || undefined }),
        placeholder: 'Buscá en las conversaciones, por email o número',
        label: 'Buscar conversaciones',
      }}
      filters={
        <DateFilterPill
          label="Empezó"
          value={query.range}
          onChange={range => update({ range })}
          onClear={() => update({ range: undefined })}
        />
      }
      hasFilters={hasFilters}
      onClearAll={() => update({ q: undefined, range: undefined })}
    />
  )
}
