'use client'

import { ChevronDownIcon, FileTextIcon, LoaderCircleIcon, PrinterIcon } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import type { ShipmentDocument } from '@/src/services/admin-shipments.service'

type ShipmentDocumentsMenuProps = {
  pending: boolean
  downloading: boolean
  onDownload: (document: ShipmentDocument) => void
}

/** Labels (one per package) as PDF or ZPL for thermal printers, and the dispatch guide for the remito. */
export function ShipmentDocumentsMenu({ pending, downloading, onDownload }: ShipmentDocumentsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={pending}>
          {downloading && <LoaderCircleIcon className="animate-spin" />}
          Descargar
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Etiqueta: una por paquete
        </DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => onDownload({ kind: 'label', format: 'pdf' })}>
          <FileTextIcon />
          Etiqueta en PDF
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onDownload({ kind: 'label', format: 'zpl' })}>
          <PrinterIcon />
          Etiqueta ZPL (impresora térmica)
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => onDownload({ kind: 'guide', format: 'pdf' })}>
          <FileTextIcon />
          Guía de despacho
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
