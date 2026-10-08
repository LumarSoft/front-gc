// Matches api-gc/docs/endpoints.md → Store activity → POST /activity.

/** What an anonymous visitor did. `visitorId` is added by the tracker. */
export type ActivityEvent =
  | { type: 'VISIT' | 'CHECKOUT_STARTED' | 'ORDER_PLACED' }
  | { type: 'PRODUCT_VIEW' | 'ADD_TO_CART'; productId: number }
  | { type: 'SEARCH'; query: string; resultCount: number }

export type ActivityReport = ActivityEvent & { visitorId: string }
