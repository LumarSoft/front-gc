import { SiteFooter } from '@/src/components/layout/site-footer'
import { SiteHeader } from '@/src/components/layout/site-header'
import { Toaster } from '@/src/components/ui/sonner'
import { TrackVisit } from '@/src/features/activity/components/track-visit'
import { AssistantLauncher } from '@/src/features/assistant/components/assistant-launcher'
import { CartDrawerProvider } from '@/src/features/cart/components/cart-drawer-provider'

export default function ShopLayout({ children }: LayoutProps<'/'>) {
  return (
    <CartDrawerProvider>
      <TrackVisit />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <AssistantLauncher />
      {/* Top center: the assistant launcher and the product buy bar already use the bottom of the screen. */}
      <Toaster position="top-center" />
    </CartDrawerProvider>
  )
}
