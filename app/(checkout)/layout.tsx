import { Toaster } from '@/src/components/ui/sonner'
import { TrackVisit } from '@/src/features/activity/components/track-visit'
import { CheckoutHeader } from '@/src/features/checkout/components/checkout-header'

/** Checkout without the store's navigation, footer or assistant: only what is needed to pay. */
export default function CheckoutLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <TrackVisit />
      <CheckoutHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <Toaster position="top-center" />
    </div>
  )
}
