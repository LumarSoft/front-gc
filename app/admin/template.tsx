/** Re-mounted on every admin navigation: the new page settles in with a short fade instead of popping in. */
export default function AdminTemplate({ children }: { children: React.ReactNode }) {
  return <div className="motion-safe:animate-page-in">{children}</div>
}
