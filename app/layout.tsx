import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { SITE } from '@/src/lib/site-config'
import { Providers } from './providers'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
})

// Admin panel font. Not preloaded: only /admin uses it, so store visitors never download it.
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  preload: false,
})

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Impresoras Epson, tintas e insumos`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
}

// Matches the navy top bar so the mobile browser UI blends with the header.
export const viewport: Viewport = {
  themeColor: '#001a4d',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es-AR" className={`${jakarta.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
