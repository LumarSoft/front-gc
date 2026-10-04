// Matches api-gc/docs/endpoints.md → Admin → POST /admin/files/images.

export type StoredFile = {
  id: number
  url: string
  originalName: string
  mimeType: string
  sizeBytes: number
}

/** Same limit and formats as the API: checked here only to answer faster. */
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
