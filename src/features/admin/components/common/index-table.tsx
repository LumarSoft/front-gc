import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/table'
import { cn } from '@/src/lib/utils'

/** Dense list table of the admin: gray header, compact rows, the whole row opens the item. */
export function IndexTable({ className, ...props }: React.ComponentProps<typeof Table>) {
  return <Table className={cn('text-sm', className)} {...props} />
}

export function IndexTableHeader({ children }: { children: React.ReactNode }) {
  return (
    <TableHeader>
      <TableRow className="border-b bg-table-head hover:bg-table-head">{children}</TableRow>
    </TableHeader>
  )
}

export function IndexTableHead({ className, ...props }: React.ComponentProps<typeof TableHead>) {
  return (
    <TableHead
      className={cn('h-9 px-3 text-xs font-medium text-muted-foreground first:pl-4 last:pr-4', className)}
      {...props}
    />
  )
}

export { TableBody as IndexTableBody }

export function IndexTableRow({ className, ...props }: React.ComponentProps<typeof TableRow>) {
  return (
    <TableRow
      className={cn(
        'relative transition-colors hover:bg-table-head has-focus-visible:bg-table-head data-[state=selected]:bg-tone-neutral/50',
        className,
      )}
      {...props}
    />
  )
}

export function IndexTableCell({ className, ...props }: React.ComponentProps<typeof TableCell>) {
  return <TableCell className={cn('h-12 px-3 py-1.5 first:pl-4 last:pr-4', className)} {...props} />
}

/** The row's main link: its hit area covers the whole row, so any cell opens the item. */
export function IndexTableRowLink({ className, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link className={cn('font-medium after:absolute after:inset-0 focus-visible:outline-none', className)} {...props} />
  )
}
