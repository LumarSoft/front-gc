import type { ProductSummary } from '@/src/types/api/catalog'

// Matches api-gc/docs/endpoints.md → Sales assistant.

export type AssistantMessageInput = {
  message: string
  /** Token from the `conversation` event; absent to start a new conversation. */
  conversation?: string
  /** Product page the customer is on. */
  productSlug?: string
}

/** `POST /assistant/cart-adds`: a product of the conversation's cards went into the cart. */
export type AssistantCartAddInput = { conversation: string; productId: number; variantId?: number }

/** A catalog card plus the variant to add to the cart, or null when the product has options to pick on its page. */
export type AssistantProductCard = ProductSummary & { variantId: number | null }

/** One line of the NDJSON stream of `POST /assistant/messages`. */
export type AssistantStreamEvent =
  | { type: 'conversation'; token: string }
  /** What the assistant is doing while the customer waits ("Buscando tintas para tu L3250…"). */
  | { type: 'status'; text: string }
  | { type: 'text'; delta: string }
  | { type: 'products'; items: AssistantProductCard[] }
  | { type: 'handoff'; url: string }
  /** Short answers to the question that ends the text: tapping one sends it as the customer's message. */
  | { type: 'replies'; options: string[] }
  | { type: 'error'; message: string }
  | { type: 'done' }
