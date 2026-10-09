#!/usr/bin/env node
/**
 * Checks that this machine has everything the current code needs and prints how to fix what is missing.
 *
 *   npm run doctor                    full report
 *   node scripts/doctor.mjs --brief   only problems (used by the Claude Code SessionStart hook)
 *
 * When a change needs a new manual step, add a check here and an entry in docs/upgrade-notes.md in the same PR.
 */
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// fileURLToPath keeps Windows paths valid (C:\...).
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const brief = process.argv.includes('--brief')
const results = []

const ok = message => results.push({ level: 'ok', message })
const warn = (message, fix) => results.push({ level: 'warn', message, fix })
const fail = (message, fix) => results.push({ level: 'fail', message, fix })

function parseEnv(path) {
  if (!existsSync(path)) return null
  const entries = {}
  for (const line of readFileSync(path, 'utf-8').split('\n')) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (match) entries[match[1]] = match[2].replace(/^["']|["']$/g, '')
  }
  return entries
}

// 1. Node version
const requiredMajor = Number(readFileSync(join(ROOT, '.nvmrc'), 'utf-8').trim().replace(/^v/, '').split('.')[0])
const currentMajor = Number(process.versions.node.split('.')[0])
if (currentMajor >= requiredMajor) ok(`Node ${process.versions.node}`)
else fail(`Node ${process.versions.node} is older than ${requiredMajor}`, 'nvm use')

// 2. Dependencies
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'))
const missingDeps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }).filter(
  name => !existsSync(join(ROOT, 'node_modules', name, 'package.json')),
)
if (missingDeps.length === 0) ok('Dependencies installed')
else
  fail(`Missing dependencies: ${missingDeps.slice(0, 5).join(', ')}${missingDeps.length > 5 ? '…' : ''}`, 'npm install')

// 3. Environment variables
const example = parseEnv(join(ROOT, '.env.example')) ?? {}
const env = parseEnv(join(ROOT, '.env.local'))
if (!env) {
  fail('.env.local does not exist', 'cp .env.example .env.local')
} else {
  const missingKeys = Object.keys(example).filter(key => !(key in env))
  if (missingKeys.length === 0) ok('.env.local has every variable from .env.example')
  else
    fail(`.env.local is missing: ${missingKeys.join(', ')}`, 'copy them from .env.example (see docs/upgrade-notes.md)')
}

// 4. API reachable (the store needs it for catalog, login, cart…)
const apiUrl = (env?.API_UPSTREAM_URL || env?.NEXT_PUBLIC_API_URL || 'http://localhost:3001').replace(/\/+$/, '')
if (apiUrl.startsWith('/')) {
  fail('A relative browser API URL requires API_UPSTREAM_URL', 'set API_UPSTREAM_URL to the absolute API origin')
}
try {
  const response = await fetch(`${apiUrl}/health`, { signal: AbortSignal.timeout(3000) })
  if (response.ok) {
    ok(`API reachable at ${apiUrl}`)
    // 5. The admin panel needs the admin endpoints (LumarSoft/api-gc#6, #7, #11, #12). GET /tags arrived with the first
    // ones; /admin/products answers 401 without a session when it exists and 404 on an older API.
    const tags = await fetch(`${apiUrl}/tags`, { signal: AbortSignal.timeout(3000) })
    const products = await fetch(`${apiUrl}/admin/products`, { signal: AbortSignal.timeout(3000) })
    const priceLists = await fetch(`${apiUrl}/admin/price-lists`, { signal: AbortSignal.timeout(3000) })
    if (tags.ok && products.status !== 404 && priceLists.status !== 404) ok('API has the admin panel endpoints')
    else
      warn('API is older than the admin panel', 'pull api-gc and restart it (cd ../api-gc && git pull && npm run dev)')
    // The cart is browser-only in the app; this probe has no cookies and creates no cart.
    const cart = await fetch(`${apiUrl}/cart`, { signal: AbortSignal.timeout(3000) })
    if (cart.ok) ok('API has the cart endpoints')
    else warn('API does not expose the cart endpoints', 'pull api-gc and restart it (see docs/upgrade-notes.md)')
    const checkout = await fetch(`${apiUrl}/cart/checkout`, { signal: AbortSignal.timeout(3000) })
    if (checkout.ok) ok('API has the checkout preview endpoints')
    else warn('API does not expose checkout preview', 'pull api-gc and restart it (see docs/upgrade-notes.md)')
    const orders = await fetch(`${apiUrl}/admin/orders`, { signal: AbortSignal.timeout(3000) })
    const recovery = await fetch(`${apiUrl}/orders/recover`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
      signal: AbortSignal.timeout(3000),
    })
    const checkoutData = checkout.ok ? await checkout.json() : null
    if (
      orders.status === 401 &&
      recovery.status === 400 &&
      typeof checkoutData?.reservationHours === 'number' &&
      'reviewToken' in checkoutData
    )
      ok('API has guest orders, private tracking and manual management')
    else
      warn(
        'API is older than guest checkout',
        'apply api-gc migrations, generate Prisma and restart it (see docs/upgrade-notes.md)',
      )
    // /ofertas and /favoritos (LumarSoft/api-gc#16): /favorites answers 401 without a session; an older API 404s.
    const favorites = await fetch(`${apiUrl}/favorites`, { signal: AbortSignal.timeout(3000) })
    const offers = await fetch(`${apiUrl}/products?onSale=true&pageSize=1`, { signal: AbortSignal.timeout(3000) })
    if (favorites.status === 401 && offers.ok) ok('API has offers and favorites')
    else warn('API is older than offers and favorites', 'pull api-gc and restart it (see docs/upgrade-notes.md)')
    // Frequent customers (LumarSoft/api-gc#17): answers 401 without a session; an older API 404s.
    const wholesale = await fetch(`${apiUrl}/wholesale-applications/mine`, { signal: AbortSignal.timeout(3000) })
    if (wholesale.status === 401) ok('API has frequent-customer applications')
    else
      warn('API is older than frequent-customer applications', 'pull api-gc and restart it (see docs/upgrade-notes.md)')
    // Stats and store activity (LumarSoft/api-gc#27, #28): the admin route answers 401 without a session and the
    // activity route rejects an empty body with 400 (nothing is stored); an older API 404s both.
    const behavior = await fetch(`${apiUrl}/admin/analytics/behavior`, { signal: AbortSignal.timeout(3000) })
    const activity = await fetch(`${apiUrl}/activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
      signal: AbortSignal.timeout(3000),
    })
    if (behavior.status === 401 && activity.status === 400) ok('API has the stats and store activity endpoints')
    else
      warn(
        'API is older than the stats page and store activity',
        'pull api-gc, apply its migrations (npx prisma migrate dev) and restart it (see docs/upgrade-notes.md)',
      )
    // Carrier shipping (LumarSoft/api-gc#32): the admin shipment route answers 401 without a session (nothing is
    // booked); an older API 404s it.
    const shipment = await fetch(`${apiUrl}/admin/orders/1/shipment/refresh`, {
      method: 'POST',
      signal: AbortSignal.timeout(3000),
    })
    if (shipment.status === 401) ok('API has carrier shipping')
    else
      warn(
        'API is older than carrier shipping',
        'pull api-gc, apply its migrations (npx prisma migrate dev) and restart it (see docs/upgrade-notes.md)',
      )
  } else warn(`API at ${apiUrl} answered ${response.status}`, 'run `npm run doctor` in api-gc')
} catch {
  warn(
    `API not reachable at ${apiUrl} (the store will show errors)`,
    'start it: cd ../api-gc && npm run dev — if it refuses to start, it says why (e.g. pending migrations)',
  )
}

// Report
const problems = results.filter(result => result.level !== 'ok')
writePendingSetupNotice(problems)
if (brief) {
  if (problems.length === 0) console.log('front-gc doctor: environment OK.')
  else {
    console.log('front-gc doctor found setup problems. Fix them before working (details: docs/upgrade-notes.md):')
    for (const p of problems) console.log(`- ${p.level === 'fail' ? 'ERROR' : 'WARN'}: ${p.message} → ${p.fix}`)
  }
} else {
  for (const r of results) {
    const icon = r.level === 'ok' ? '✓' : r.level === 'warn' ? '!' : '✗'
    console.log(`${icon} ${r.message}${r.fix ? `\n    → ${r.fix}` : ''}`)
  }
  console.log(
    problems.length === 0 ? '\nEverything is ready.' : '\nSee docs/upgrade-notes.md for the context of each step.',
  )
}
process.exitCode = results.some(result => result.level === 'fail') ? 1 : 0

/**
 * PENDING-SETUP.md (git-ignored) exists only while the doctor finds errors or an API older than this front: the next
 * person or AI agent that opens the project sees what is missing before doing anything else (AGENTS.md tells agents to
 * read it first). Every doctor run (manual, after a pull, Claude Code session start) rewrites it, and deletes it once
 * those problems are gone. A stopped API alone does not count: starting it is part of normal work.
 */
function writePendingSetupNotice(problems) {
  const notice = join(ROOT, 'PENDING-SETUP.md')
  if (!problems.some(problem => problem.level === 'fail' || /older than/i.test(problem.message))) {
    if (existsSync(notice)) rmSync(notice)
    return
  }
  const notesPath = join(ROOT, 'docs', 'upgrade-notes.md')
  const notes = existsSync(notesPath)
    ? [...readFileSync(notesPath, 'utf-8').matchAll(/^## (.+)$/gm)]
        .map(match => match[1])
        .filter(title => !/^Always/i.test(title))
        .slice(0, 3)
    : []
  const lines = [
    '# Pending setup — fix this before any other work',
    '',
    '> Written by `npm run doctor` (git-ignored). It disappears when the doctor passes. **AI agents:** resolve these',
    '> steps first (ask the user only for secrets or passwords), tell the user what you ran, then run `npm run doctor`',
    '> again. An "API is older" step means updating `../api-gc` (pull, its own `npm run doctor`, restart it).',
    '',
    ...problems.map(
      problem => `- **${problem.level === 'fail' ? 'ERROR' : 'WARN'}:** ${problem.message} → \`${problem.fix}\``,
    ),
    '',
    'Context for each step: `docs/upgrade-notes.md`. Latest entries:',
    '',
    ...notes.map(title => `- ${title}`),
    '',
  ]
  try {
    writeFileSync(notice, lines.join('\n'))
  } catch {
    // A read-only checkout still gets the console report.
  }
}
