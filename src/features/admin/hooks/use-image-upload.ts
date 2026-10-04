'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { adminErrorMessage } from '@/src/features/admin/lib/admin-error-message'
import { uploadImage } from '@/src/services/admin-files.service'
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES, type StoredFile } from '@/src/types/api/admin-files'

/** Uploads one image right after it is picked; checks type and size first so the admin gets an instant answer. */
export function useImageUpload(onUploaded: (file: StoredFile) => void) {
  const [error, setError] = useState<string | null>(null)
  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: file => {
      setError(null)
      onUploaded(file)
    },
    onError: uploadError => setError(adminErrorMessage(uploadError)),
  })

  const upload = (file: File | undefined): void => {
    if (!file) return
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return setError('Elegí una imagen JPG, PNG, WebP o AVIF.')
    if (file.size > MAX_IMAGE_BYTES) return setError('La imagen pesa más de 5 MB. Elegí una más liviana.')
    setError(null)
    mutation.mutate(file)
  }

  return { upload, isUploading: mutation.isPending, error }
}
