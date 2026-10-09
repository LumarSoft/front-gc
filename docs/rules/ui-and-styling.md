# UI and styling

## Visual direction

- Clean, minimal, warm and human, with a modern, dynamic touch. Less "suit and tie", more creative.
- Generous whitespace, strong product photography, few colors, clear typography hierarchy.
- The site must look great on a phone first — a lot of traffic comes from Instagram.

## Visual references

Check these before designing any page or section, in priority order:

1. **[epson.com.ar](https://epson.com.ar/)** — the main reference. Follow its layout patterns, product presentation,
   navigation and visual clarity closely.
2. **[eco3.com/es/productos](https://eco3.com/es/productos)** — catalog and product listing.
3. **[agfa.com/corporate](https://www.agfa.com/corporate/)** — institutional sections.

On top of that, add dynamism and modernity (purposeful motion, richer transitions, more expressive sections) — see
Animations below.

## Epson assets

Comunicaciones Gráficas is an **official Epson distributor** and has the right to use Epson's material: product
images, logos, banners and other brand assets can be taken from Epson's sites. The store's own identity (logo,
name) is still Comunicaciones Gráficas — Epson branding is used as the brand it sells, not as the store's.

Product photos on colored surfaces (the home hero shortcuts, `public/images/home/`) are Epson's studio shots with
the white background removed (cropped above the mirror reflection under the product), saved as WebP with transparency.
Only dark products cut out cleanly; white printers keep their photo on a white card. The home promo banners
(`promo-*.webp`) are finished artwork that already carries its text: the card only adds the button, so a new banner
must keep its copy on the left with free space under it. The home hero (`hero-ecotank-l5590.webp`) is a full scene photo with an empty left third: the copy, badges
and buttons go over it from `xl`, and under it on smaller screens.

## Store logo

- The Comunicaciones Gráficas logo ("CG" with cyan, magenta and yellow waves) was provided by the client on
  2026-10-08. Files in `public/images/brand/`: `logo-cg.png` (black letters, light surfaces) and `logo-cg-light.png`
  (white letters, dark surfaces: footer, admin frame, navy panels). The waves keep their colors in both.
- Always render it through `BrandLogoImage` (image only) or `BrandLogo` (image + name, links home) from
  `src/components/layout/` — never redraw it with CSS or recolor the waves.
- Browser and home-screen icons (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`) show the logo on a white tile
  so it reads on dark tab bars too.
- A new version of the logo replaces both PNGs and the three icons together.

## Design tokens

- Colors, fonts, radii and shadows are defined once as tokens in `app/globals.css` (`@theme inline`).
- Components use token classes (`bg-primary`, `text-muted-foreground`), **never** hex values or arbitrary values
  (`bg-[#ff6600]`, `mt-[13px]`).
- Changing the brand palette must be possible by editing only `globals.css`.

## Tailwind

- Tailwind only. No CSS modules or inline `style` except for truly dynamic values.
- Mobile first: design for 375 px and scale up with `sm:` / `md:` / `lg:`.
- Merge conditional classes with the `cn()` helper (`src/lib/utils.ts`, created by shadcn) — no string concatenation.

## Animations

- Animations must have a purpose: feedback, state transitions, guiding attention. Keep them short and subtle.
- Prefer CSS / Tailwind transitions. Adding an animation library (e.g. Framer Motion) is a team decision.
- Always respect `prefers-reduced-motion` (`motion-safe:` / `motion-reduce:`).
- Never animate in a way that shifts layout (CLS) or delays content.

## Media

- Images with `next/image`, with a descriptive `alt` and explicit sizes.
- Fonts with `next/font`.
- Icons: see "Icons" below.

## Icons

- **Admin** (`src/features/admin/`, `app/admin/`): `lucide-react` only, enforced by ESLint. Default stroke; a thicker
  stroke (`strokeWidth={2.5}`) marks the current section in the navigation, since Lucide has no filled variants. Small
  check/minus marks inside checkboxes use `strokeWidth={3}`.
- **Never `@shopify/polaris-icons`**: its license only allows apps that integrate with Shopify, or standalone apps
  visually distinct from Shopify's admin, which ours deliberately resembles.
- **Store**: moving to `lucide-react` page by page. The header, the home and the shared `SectionHeading`/`ScrollRail`
  already use Lucide (`strokeWidth={1.5}` in the header); the rest still uses `@phosphor-icons/react`. Migrate each page
  when it gets its visual pass, and drop the Phosphor dependency once nothing imports it.

## Accessibility

- Semantic HTML: `button` for actions, `Link` for navigation, headings in order.
- Every input has a `label`. Visible focus states. Sufficient contrast.
- Everything works with the keyboard.

## Copy

- User-facing text in **Spanish (Argentina)**, using voseo and a warm tone ("Agregá al carrito", "Elegí tu impresora").
- No unnecessary technical jargon. Errors explain what happened and what to do next.
- `<html lang="es-AR">`.
