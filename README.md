# front-gc — Next.js 16 + Tailwind v4

Frontend for the Comunicaciones Gráficas e-commerce. Backend: [api-gc](https://github.com/LumarSoft/api-gc)
(NestJS + Prisma + MySQL).

> **Before writing code (humans or AI agents), read [AGENTS.md](AGENTS.md) and [docs/rules/](docs/rules/).**

## Installation

### 1. Prerequisites

| Tool    | Version | Check           |
| ------- | ------- | --------------- |
| Node.js | 22+     | `node -v`       |
| npm     | 10+     | `npm -v`        |
| Git     | any     | `git --version` |

We recommend cloning both repos side by side:

```
CG/
├── api-gc/
└── front-gc/   # this repo
```

### 2. Clone and install

```bash
git clone git@github.com:LumarSoft/front-gc.git
cd front-gc
npm install
```

`npm install` also installs the Husky pre-commit hook that runs Prettier on staged files.

### 3. Run

```bash
npm run dev        # http://localhost:3000
```

You should see the default Next.js page.

### 4. Run together with the API

The front talks to the API on `http://localhost:3001`. Set up and start [api-gc](https://github.com/LumarSoft/api-gc)
following its README, then run both at the same time in two terminals:

```bash
# terminal 1
cd api-gc && npm run dev      # http://localhost:3001

# terminal 2
cd front-gc && npm run dev    # http://localhost:3000
```

The API already allows requests from `http://localhost:3000` (CORS).

### 5. Environment variables

None are required yet. When the front starts calling the API, the base URL goes in `.env.local` (git-ignored):

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Anything prefixed with `NEXT_PUBLIC_` is visible in the browser — never put secrets there.

## Scripts

| Script          | What it does         |
| --------------- | -------------------- |
| `npm run dev`   | Dev server           |
| `npm run build` | Production build     |
| `npm run start` | Run production build |
| `npm run lint`  | ESLint               |

## Production build

```bash
npm ci
npm run build
npm run start      # serves on port 3000 (use `npm run start -- -p <port>` to change it)
```

## Troubleshooting

| Problem                                        | Fix                                                                                               |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `npm ci` says the lock file is out of sync     | Run `npm install` and commit the updated `package-lock.json`.                                     |
| `Port 3000 is in use`                          | Stop the other process or run `npm run dev -- -p 3002`.                                           |
| Prettier did not run on commit                 | Run `npm install` (it installs the hook) and check `git config core.hooksPath` prints `.husky/_`. |
| `AGENTS.md` shows changes after `npm run dev`  | Next.js re-adds its managed block; commit it as is (see the note at the top of `AGENTS.md`).      |
| Browser shows CORS errors when calling the API | Check `CORS_ORIGIN` in `api-gc/.env` includes the front's URL.                                    |
