import { SiteFooter } from '@/src/components/layout/site-footer'
import { SiteHeader } from '@/src/components/layout/site-header'
import { AssistantLauncher } from '@/src/features/assistant/components/assistant-launcher'
import { CartDrawerProvider } from '@/src/features/cart/components/cart-drawer-provider'

export default function ShopLayout({ children }: LayoutProps<'/'>) {
  return (
    <CartDrawerProvider>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <AssistantLauncher />
    </CartDrawerProvider>
  )
}
