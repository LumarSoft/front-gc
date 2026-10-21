'use client'

import { MessageSquareTextIcon } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { EmptyState } from '@/src/components/ui/empty-state'
import { AdminPageHeader } from '@/src/features/admin/components/admin-page-header'
import { ConversationsFilters } from '@/src/features/admin/components/assistant/conversations/conversations-filters'
import { ConversationsMobileList } from '@/src/features/admin/components/assistant/conversations/conversations-mobile-list'
import { ConversationsTable } from '@/src/features/admin/components/assistant/conversations/conversations-table'
import { ListCard } from '@/src/features/admin/components/common/list-card'
import { ListPagination } from '@/src/features/admin/components/common/list-pagination'
import { useAdminConversations } from '@/src/features/admin/hooks/use-admin-assistant'
import { useConversationListParams } from '@/src/features/admin/hooks/use-conversation-list-params'
import { useLastPageFallback } from '@/src/features/admin/hooks/use-last-page-fallback'
import { cn } from '@/src/lib/utils'

/** "Asesor IA": what customers ask the store's assistant, most recent first. Staff read; they do not answer here. */
export function ConversationsView() {
  const { query, update, clear, hasFilters } = useConversationListParams()
  const { data, isPending, isError, isPlaceholderData, refetch } = useAdminConversations(query)
  const items = data?.items ?? []
  useLastPageFallback(data, page => update({ page }))

  return (
    <>
      <AdminPageHeader
        title="Asesor IA"
        description="Lo que los clientes le preguntan al asesor de la tienda. Si alguien pide hablar con una persona, el asesor le ofrece seguir por WhatsApp."
      />
      <ListCard
        toolbar={<ConversationsFilters />}
        isPending={isPending}
        isError={isError}
        onRetry={() => void refetch()}
        isEmpty={items.length === 0}
        empty={
          hasFilters || query.status ? (
            <EmptyState
              icon={<MessageSquareTextIcon />}
              title="Ninguna conversación coincide"
              description="Probá con otra búsqueda, otras fechas o mirá todas las conversaciones."
              action={
                <Button variant="outline" onClick={clear}>
                  Ver todas
                </Button>
              }
            />
          ) : (
            <EmptyState
              icon={<MessageSquareTextIcon />}
              title="Todavía no hay conversaciones"
              description="Cuando un cliente le escriba al asesor desde la tienda, la conversación aparece acá."
            />
          )
        }
      >
        <div className={cn('transition-opacity duration-200', isPlaceholderData && 'opacity-50')}>
          <ConversationsTable conversations={items} />
          <ConversationsMobileList conversations={items} />
          {data && <ListPagination {...data} onPageChange={page => update({ page })} />}
        </div>
      </ListCard>
    </>
  )
}
