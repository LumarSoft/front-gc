import { apiRequest } from '@/src/lib/api-client'
import type { StoredFile } from '@/src/types/api/admin-files'

export function uploadImage(file: File): Promise<StoredFile> {
  const body = new FormData()
  body.append('file', file)
  return apiRequest<StoredFile>('/admin/files/images', { method: 'POST', body })
}
