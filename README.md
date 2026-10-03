# front-gc — Next.js 16 + Tailwind v4

Frontend for the Comunicaciones Gráficas e-commerce. Backend: `api-gc` (NestJS + Prisma + MySQL).

> **Before writing code (humans or AI agents), read [AGENTS.md](AGENTS.md) and [docs/rules/](docs/rules/).**

## Quick start

```bash
git clone <repo-url>
cd front-gc
npm install        # also installs the Husky pre-commit hook (Prettier via lint-staged)
npm run dev        # http://localhost:3000
```

The API must be running on `http://localhost:3001` (see the `api-gc` README).

## Scripts

| Script          | What it does         |
| --------------- | -------------------- |
| `npm run dev`   | Dev server           |
| `npm run build` | Production build     |
| `npm run start` | Run production build |
| `npm run lint`  | ESLint               |
