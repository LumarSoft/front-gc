'use client'

import { use } from 'react'
import {
  AdminSidebarContext,
  type AdminSidebarState,
} from '@/src/features/admin/components/shell/admin-sidebar-provider'

/** The desktop sidebar's folded state and its toggle. */
export function useAdminSidebar(): AdminSidebarState {
  return use(AdminSidebarContext)
}
