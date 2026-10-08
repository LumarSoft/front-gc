/** The reservation expiry job failed or is late: staff must not confirm payments of orders past their deadline. */
export function ExpiryJobAlert() {
  return (
    <div
      role="alert"
      className="mb-4 flex items-start gap-3 rounded-xl bg-tone-critical px-4 py-3 text-sm text-tone-critical-foreground"
    >
      <TriangleAlertIcon strokeWidth={2.25} className="mt-0.5 size-4 shrink-0" />
      <p>
        <span className="font-semibold">Hay reservas vencidas sin procesar.</span> No confirmes pagos de pedidos cuyo
        plazo ya terminó; avisale al equipo técnico si este aviso no desaparece en unos minutos.
      </p>
    </div>
  )
}
import { TriangleAlertIcon } from 'lucide-react'
