export type Currency = 'ARS' | 'USD'

/** Money as sent by the API: decimal string + currency. Never parse to float for math. */
export type Money = {
  amount: string
  currency: Currency
}
