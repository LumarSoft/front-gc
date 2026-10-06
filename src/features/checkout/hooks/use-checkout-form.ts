'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { AuthUser } from '@/src/types/api/auth'
import { checkoutSchema, type CheckoutValues } from '../lib/checkout-schema'
import type { PreviewCheckoutRequest } from '@/src/types/api/checkout'

export function useCheckoutForm(user: AuthUser | null | undefined, onPreview: (input: PreviewCheckoutRequest) => void) {
  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user ? `${user.firstName} ${user.lastName}` : '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      deliveryMethod: 'STORE_PICKUP',
      shippingAddress: { street: '', streetNumber: '', city: '', province: '', postalCode: '' },
    },
  })
  const submit = form.handleSubmit(({ phone, shippingAddress, ...values }) =>
    onPreview({
      ...values,
      phone: phone || undefined,
      shippingAddress: values.deliveryMethod === 'LOCAL_DELIVERY' ? shippingAddress : undefined,
    }),
  )
  return { form, submit }
}
