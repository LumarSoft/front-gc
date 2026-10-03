# Code style

## Naming conventions

- Files and folders: `kebab-case` (e.g. `product-card.tsx`, `use-cart.ts`)
- React components: `PascalCase` (e.g. `ProductCard`, `CheckoutForm`)
- Functions, variables, hooks: `camelCase` (e.g. `fetchProducts`, `isLoading`, `useCart`)
- Constants: `UPPER_SNAKE_CASE` (e.g. `FREE_SHIPPING_LABEL`)
- Types and interfaces: `PascalCase`, prefix interfaces with `I` only if it adds clarity
- Everything in code (names, comments, variables) must be written in English
- Domain terms use the same English names as the backend glossary (`api-gc/docs/rules/naming.md`): `retail`,
  `wholesale`, `WholesaleApplication`, `CurrentAccount`, `StorePickup`…

## Exports

- Named exports for components, hooks and utils.
- `export default` only where Next.js requires it (`page`, `layout`, `loading`, `error`, `not-found`, etc.).

## TypeScript

- Strict mode always on
- Never use `any` — use `unknown` and narrow, or define the proper type
- Always type function parameters and return values explicitly
- Type API requests and responses in `src/types/api/`
- Props are typed with a `type` (`type ProductCardProps = { … }`), not `React.FC`

## Logic

- Keep logic as simple as possible — if a function needs a comment to be understood, simplify it
- No duplicated logic — extract to a shared util or hook before copy-pasting
- Single responsibility: one function, one thing
- No commented-out code in commits
