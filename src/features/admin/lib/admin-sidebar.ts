/** Cookie that remembers the desktop sidebar state, read on the server so the page never jumps on load. */
export const SIDEBAR_COOKIE = 'cg_admin_sidebar'

export const isSidebarCollapsed = (value: string | undefined): boolean => value === 'collapsed'
