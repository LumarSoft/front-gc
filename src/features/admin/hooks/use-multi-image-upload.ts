'use client'

import { useState } from 'react'
import { adminErrorMessage } from '@/src/features/admin/lib/admin-error-message'
import { uploadImage } from '@/src/services/admin-files.service'
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES, type StoredFile } from '@/src/types/api/admin-files'

/** Uploads several images one after the other; files that fail are reported and the rest keep going. */
export function useMultiImageUpload(onUploaded: (file: StoredFile) => void) {
  const [remaining, setRemaining] = useState(0)
  const [errors, setErrors] = useState<string[]>([])

  const upload = async (files: File[]): Promise<void> => {
    setErrors([])
    setRemaining(files.length)
    for (const file of files) {
      try {
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) throw new Error('type')
        if (file.size > MAX_IMAGE_BYTES) throw new Error('size')
        onUploaded(await uploadImage(file))
      } catch (error) {
        const reason =
          error instanceof Error && error.message === 'type'
            ? 'no es JPG, PNG, WebP ni AVIF'
            : error instanceof Error && error.message === 'size'
              ? 'pesa más de 5 MB'
              : adminErrorMessage(error)
        setErrors(current => [...current, `${file.name}: ${reason}`])
      } finally {
        setRemaining(current => current - 1)
      }
    }
  }

  return { upload: (files: File[]) => void upload(files), isUploading: remaining > 0, remaining, errors }
}
