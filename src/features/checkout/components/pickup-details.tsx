import { FieldGroup, FieldRow } from '@/src/components/ui/floating-field'
import type { CheckoutDelivery } from '@/src/types/api/checkout'
import { deliveryPrice } from '../lib/delivery-price'
import { CheckoutFieldErrors, CheckoutInput } from './checkout-input'

/** Pickup at the store: where, and who picks it up. */
export function PickupDetails({ pickup }: { pickup: CheckoutDelivery | undefined }) {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h3 className="font-semibold">Lugar de retiro</h3>
        <div className="flex items-start justify-between gap-4 rounded-lg border border-primary bg-accent/40 px-4 py-3.5">
          <span>
            <span className="block text-sm font-semibold">{pickup?.name ?? 'Retiro en el local'}</span>
            {pickup?.description && (
              <span className="mt-0.5 block text-sm text-muted-foreground">{pickup.description}</span>
            )}
          </span>
          <span className="text-sm font-semibold">{deliveryPrice(pickup?.cost ?? null) ?? 'Gratis'}</span>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold">Quién retira</h3>
        <FieldGroup>
          <FieldRow>
            <CheckoutInput name="firstName" label="Nombre" autoComplete="given-name" />
            <CheckoutInput name="lastName" label="Apellido" autoComplete="family-name" />
          </FieldRow>
          <CheckoutInput name="phone" label="Teléfono (opcional)" type="tel" inputMode="tel" autoComplete="tel" />
        </FieldGroup>
        <CheckoutFieldErrors names={['firstName', 'lastName', 'phone']} />
      </div>
    </div>
  )
}
