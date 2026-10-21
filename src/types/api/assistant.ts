import type { ProductSummary } from '@/src/types/api/catalog'

// Matches api-gc/docs/endpoints.md → Sales assistant.

export type AssistantMessageInput = {
  message: string
  /** Token from the `conversation` event; absent to start a new conversation. */
  conversation?: string
  /** Product page the customer is on. */
  productSlug?: string
}

/** A catalog card plus the variant to add to the cart, or null when the product has options to pick on its page. */
export type AssistantProductCard = ProductSummary & { variantId: number | null }

/** One line of the NDJSON stream of `POST /assistant/messages`. */
export type AssistantStreamEvent =
  | { type: 'conversation'; token: string }
  | { type: 'text'; delta: string }
  | { type: 'products'; items: AssistantProductCard[] }
  | { type: 'handoff'; url: string }
  | { type: 'error'; message: string }
  | { type: 'done' }
