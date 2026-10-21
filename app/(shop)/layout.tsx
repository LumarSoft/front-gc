import { SiteFooter } from '@/src/components/layout/site-footer'
import { SiteHeader } from '@/src/components/layout/site-header'
import { Toaster } from '@/src/components/ui/sonner'
import { TrackVisit } from '@/src/features/activity/components/track-visit'
import { AssistantProvider } from '@/src/features/assistant/components/assistant-provider'
import { CartDrawerProvider } from '@/src/features/cart/components/cart-drawer-provider'

export default function ShopLayout({ children }: LayoutProps<'/'>) {
  return (
    <CartDrawerProvider>
      {/* Inside the cart provider: the assistant's product cards add to the cart and open its drawer. */}
      <AssistantProvider>
        <TrackVisit />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {/* Top center: the assistant launcher and the product buy bar already use the bottom of the screen. */}
        <Toaster position="top-center" />
      </AssistantProvider>
    </CartDrawerProvider>
  )
}
