import { Breadcrumbs, type BreadcrumbItem } from '@/src/components/ui/breadcrumbs'

type AccountPageHeaderProps = {
  trail: BreadcrumbItem[]
  title: string
  description?: React.ReactNode
}

/** Breadcrumbs from "Mi cuenta", the page title and an optional line under it. */
export function AccountPageHeader({ trail, title, description }: AccountPageHeaderProps) {
  return (
    <header>
      <Breadcrumbs items={[{ label: 'Mi cuenta', href: '/mi-cuenta' }, ...trail]} />
      <h1
        id="account-page-title"
        tabIndex={-1}
        className="mt-3 text-3xl font-extrabold tracking-tight outline-none sm:text-4xl"
      >
        {title}
      </h1>
      {description && <div className="mt-3 text-muted-foreground">{description}</div>}
    </header>
  )
}
