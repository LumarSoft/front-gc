# Commerce rules

## Prices and money

- **The front never decides what the customer pays.** Totals, discounts, shipping costs and wholesale prices come
  from the API. The front may show provisional subtotals, but the checkout total is always the API's.
- Money arrives as decimal strings (`"1234.50"`) with a currency (`ARS` | `USD`). Never do money math with floats.
- Format with a single helper in `src/lib/format.ts` using
  `Intl.NumberFormat('es-AR', { style: 'currency', currency })`.
- Dates in Argentine format (`dd/mm/yyyy`).

## Buyer profiles

- Retail and wholesale users see different prices. The API decides which price applies — the front only renders it.
- A wholesaler whose application is pending or paused sees the store as retail, with a clear status message.

## Stock

- Respect the product's out-of-stock behavior sent by the API: hidden, shown as unavailable, or "inquire".
- Never block or allow checkout based only on local state — the API validates stock and reservations.

## Checkout

- Delivery options: free in-store pickup, Rosario delivery (with free-shipping threshold), shipping quote for the rest
  of the country. Thresholds and rates come from the API.
- After returning from Mercado Pago, show the order status from the API, not from the redirect query string.

## Legal

- Terms and conditions, privacy, cookies and the "botón de arrepentimiento" are required pages. Their text is
  provided by the client — never invent legal copy.
