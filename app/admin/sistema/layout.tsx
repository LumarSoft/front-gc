import { DeveloperOnly } from '@/src/features/admin/components/developer-only'

/** How the system works inside is for developers only. */
export default function SystemLayout({ children }: LayoutProps<'/admin/sistema'>) {
  return <DeveloperOnly>{children}</DeveloperOnly>
}
