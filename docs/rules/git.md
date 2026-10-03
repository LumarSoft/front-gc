# Git

## Commit format (Conventional Commits)

- `feat:` new feature
- `fix:` bug fix
- `chore:` tooling, dependencies, config
- `refactor:` code change with no behavior change
- `docs:` documentation only
- `style:` formatting (should be rare — Prettier handles this automatically)
- `test:` adding or fixing tests

Description in English, lowercase, no period at the end.

Examples:

- `feat: add product grid with brand filter`
- `fix: correct currency format in cart summary`
- `refactor: extract useCheckout hook from CheckoutPage`

## Branches and PRs

- Branches: `feat/<topic>`, `fix/<topic>`, `chore/<topic>`. Never push directly to the main branch.
- Every change goes through a PR reviewed by another team member.
- PRs that change UI include screenshots (mobile and desktop).

## Rules

- No commented-out code in any commit
- No `console.log` in any commit
- One PR = one responsibility — do not mix a new feature with a refactor
- PR title must follow the same Conventional Commits format
