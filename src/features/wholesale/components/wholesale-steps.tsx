const STEPS = [
  { title: 'Ingresá o creá tu cuenta', text: 'La solicitud queda asociada a tu usuario de la tienda.' },
  {
    title: 'Completá los datos de tu empresa',
    text: 'Razón social, CUIT, condición frente al IVA y un contacto de compras.',
  },
  {
    title: 'Revisamos tu solicitud',
    text: 'Ves el estado en Mi cuenta. Cuando la aprobamos, al ingresar ya ves los precios de tu cuenta.',
  },
]

export function WholesaleSteps() {
  return (
    <ol className="grid gap-6 sm:grid-cols-3">
      {STEPS.map((step, index) => (
        <li key={step.title} className="border-t-2 border-foreground pt-4">
          <p className="font-mono text-sm text-muted-foreground">0{index + 1}</p>
          <h3 className="mt-2 text-lg leading-snug font-extrabold">{step.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
        </li>
      ))}
    </ol>
  )
}
