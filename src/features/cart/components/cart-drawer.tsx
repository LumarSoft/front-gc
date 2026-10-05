'use client'

import { XIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/src/components/ui/sheet'
import { CartView } from '@/src/features/cart/components/cart-view'
import { useCartDrawer } from '@/src/features/cart/hooks/use-cart-drawer'

export function CartDrawer() {
  const { isOpen, setIsOpen, closeCart, returnFocus } = useCartDrawer()
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        showCloseButton={false}
        data-cart-drawer
        className="gap-0 data-[side=right]:h-dvh data-[side=right]:w-full data-[side=right]:sm:max-w-lg data-[side=right]:data-open:slide-in-from-right-full data-[side=right]:data-closed:slide-out-to-right-full motion-reduce:animate-none motion-reduce:transition-none"
        onCloseAutoFocus={event => {
          event.preventDefault()
          if (returnFocus.current?.isConnected) returnFocus.current.focus()
        }}
      >
        <SheetHeader className="shrink-0 border-b p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <SheetTitle className="text-2xl font-extrabold">Tu carrito</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Cerrar carrito">
                <XIcon className="size-5" />
              </Button>
            </SheetClose>
          </div>
          <SheetDescription>Todo lo que elegiste, sin salir de la página.</SheetDescription>
        </SheetHeader>
        <CartView drawer onContinue={closeCart} />
      </SheetContent>
    </Sheet>
  )
}
