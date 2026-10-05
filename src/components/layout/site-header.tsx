import Link from 'next/link'
import { HeartIcon } from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/src/components/ui/button'
import { AnnouncementBar } from '@/src/components/layout/announcement-bar'
import { BrandLogo } from '@/src/components/layout/brand-logo'
import { MobileNav } from '@/src/components/layout/mobile-nav'
import { SearchForm } from '@/src/components/layout/search-form'
import { AccountMenu } from '@/src/features/auth/components/account-menu'
import { CartLink } from '@/src/features/cart/components/cart-link'
import { CATEGORY_LINKS, HIGHLIGHT_LINKS, OFFERS_LINK } from '@/src/lib/navigation'
import { cn } from '@/src/lib/utils'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40">
      <AnnouncementBar />
      <div className="border-b bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6 lg:h-18 lg:gap-8">
          <MobileNav />
          <BrandLogo />
          <SearchForm className="hidden flex-1 md:block lg:max-w-xl" />
          <div className="ml-auto flex items-center gap-1">
            <AccountMenu />
            <Button asChild variant="ghost" size="icon-lg" className="hidden sm:inline-flex">
              <Link href="/favoritos" aria-label="Favoritos">
                <HeartIcon weight="light" className="size-6" />
              </Link>
            </Button>
            <CartLink />
          </div>
        </div>
        <div className="px-4 pb-3 md:hidden">
          <SearchForm />
        </div>
        <nav aria-label="Categorías" className="hidden border-t xl:block">
          <div className="mx-auto flex h-11 max-w-7xl items-center justify-between gap-6 px-6 text-sm">
            <ul className="flex items-center gap-6 whitespace-nowrap">
              {CATEGORY_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative py-3 font-medium text-foreground/80 transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:text-primary hover:after:scale-x-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex shrink-0 items-center gap-4 whitespace-nowrap">
              {HIGHLIGHT_LINKS.map(link => (
                // The configurator already has the hero CTA and the floating button; show it here only on wide screens.
                <li key={link.href} className={cn(link.href === '/configurador' && 'hidden 2xl:block')}>
                  <Link
                    href={link.href}
                    className={cn(
                      'font-semibold text-primary hover:underline',
                      link === OFFERS_LINK &&
                        'rounded-full bg-sale px-3 py-1 text-xs font-bold text-sale-foreground hover:no-underline',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}
