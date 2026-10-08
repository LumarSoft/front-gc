import Link from 'next/link'
import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr'
import type { HomeTodo } from '@/src/features/admin/lib/home-todos'

/** What is waiting, as pills that open the right filtered list (like "Preparar pedidos 50+"). */
export function HomeTodos({ todos }: { todos: HomeTodo[] }) {
  if (todos.length === 0) {
    return (
      <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <CheckCircleIcon weight="fill" className="size-4 text-success" />
        Todo al día: no hay pagos, pedidos ni solicitudes esperando.
      </p>
    )
  }
  return (
    <nav aria-label="Para hacer" className="flex flex-wrap justify-center gap-2">
      {todos.map(todo => (
        <Link
          key={todo.href}
          href={todo.href}
          className="inline-flex h-9 items-center gap-2 rounded-xl border bg-card pr-1.5 pl-3.5 text-sm font-medium transition-colors hover:bg-table-head focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {todo.label}
          <span className="grid h-6 min-w-6 place-items-center rounded-lg bg-tone-neutral px-1.5 text-xs tabular-nums">
            {todo.count > 50 ? '50+' : todo.count}
          </span>
        </Link>
      ))}
    </nav>
  )
}
