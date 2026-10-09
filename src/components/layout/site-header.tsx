import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { AnnouncementBar } from '@/src/components/layout/announcement-bar'
import { BrandLogo } from '@/src/components/layout/brand-logo'
import { CategoryNav } from '@/src/components/layout/category-nav'
import { MobileNav } from '@/src/components/layout/mobile-nav'
import { SearchForm } from '@/src/components/layout/search-form'
import { AccountMenu } from '@/src/features/auth/components/account-menu'
import { CartLink } from '@/src/features/cart/components/cart-link'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40">
      <AnnouncementBar />
      <div className="border-b bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6 lg:h-18 lg:gap-10">
          <MobileNav />
          <BrandLogo priority withTagline className="shrink-0" />
          <SearchForm className="hidden flex-1 md:block lg:max-w-2xl" />
          <div className="ml-auto flex items-center gap-0.5 lg:gap-1">
            <AccountMenu />
            <Button asChild variant="ghost" className="hidden h-10 gap-2 px-2.5 text-sm font-medium sm:inline-flex">
              <Link href="/favoritos" aria-label="Favoritos">
                <Heart strokeWidth={1.5} className="size-6" />
                <span className="hidden lg:inline">Favoritos</span>
              </Link>
            </Button>
            <span aria-hidden className="mx-1 hidden h-6 w-px bg-border lg:block" />
            <CartLink />
          </div>
        </div>
        <div className="px-4 pb-3 md:hidden">
          <SearchForm id="site-search-mobile" />
        </div>
        <CategoryNav />
      </div>
    </header>
  )
}
