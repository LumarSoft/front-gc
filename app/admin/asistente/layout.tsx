import { DeveloperOnly } from '@/src/features/admin/components/developer-only'

/** The assistant's conversations, missing data and metrics are for developers only. */
export default function AssistantAdminLayout({ children }: LayoutProps<'/admin/asistente'>) {
  return <DeveloperOnly>{children}</DeveloperOnly>
}
