import Link from 'next/link'
import { ShoppingBagIcon } from 'lucide-react'
import { BrandLogo } from '@/src/components/layout/brand-logo'

/**
 * Logo back to the store and a way back to the cart; nothing else competes with paying. On wide screens it follows
 * the page's two columns, so the logo lines up with the form and the bag with the summary.
 */
export function CheckoutHeader() {
  return (
    <header className="border-b bg-background">
      <div className="flex h-18 items-center justify-between px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-0">
        <div className="lg:flex lg:justify-end lg:pr-12 xl:pr-16">
          <div className="lg:w-full lg:max-w-xl">
            <BrandLogo priority />
          </div>
        </div>
        <div className="lg:pl-12 xl:pl-16">
          <div className="flex justify-end lg:max-w-md">
            <Link
              href="/carrito"
              aria-label="Volver al carrito"
              className="rounded-md p-2 text-primary hover:bg-accent"
            >
              <ShoppingBagIcon aria-hidden strokeWidth={1.5} className="size-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
