'use client'

import { CheckoutField } from '../checkout-field'

/** The rest of the address and the recipient's document, which carriers require even for branch pickup. */
export function CarrierRecipient({ pickup }: { pickup: boolean }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-bold">Datos para el envío</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {pickup
            ? 'Aunque retires en una sucursal, el transporte pide tu domicilio y tu documento.'
            : 'El transporte entrega en esta dirección y le pide el documento a quien recibe.'}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <CheckoutField name="shippingAddress.street" label="Calle" autoComplete="address-line1" />
        <CheckoutField
          name="shippingAddress.streetNumber"
          label="Número"
          autoComplete="address-line2"
          description="Sumá piso y depto. si hace falta."
        />
      </div>
      <CheckoutField
        name="shippingAddress.taxId"
        label="DNI o CUIT de quien recibe"
        autoComplete="off"
        inputMode="numeric"
        description="Solo números. Lo piden los transportes para entregar."
      />
    </div>
  )
}
