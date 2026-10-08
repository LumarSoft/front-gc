/** Same cap as the API's list DTOs: a larger page is rejected with 400, so links never send one. */
export const MAX_PAGE = 10_000

/** `?page=` value → integer page in 1–MAX_PAGE. Anything invalid is page 1; a page past the cap is the cap. */
export function parsePage(value: string | null | undefined): number {
  const page = Number(value)
  return Number.isInteger(page) && page > 1 ? Math.min(page, MAX_PAGE) : 1
}
