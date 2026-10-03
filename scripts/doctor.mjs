#!/usr/bin/env node
/**
 * Checks that this machine has everything the current code needs and prints how to fix what is missing.
 *
 *   npm run doctor                    full report
 *   node scripts/doctor.mjs --brief   only problems (used by the Claude Code SessionStart hook)
 *
 * When a change needs a new manual step, add a check here and an entry in docs/upgrade-notes.md in the same PR.
 */
import { existsSync, readFileSync } from 'node:fs'
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
const apiUrl = (env?.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001').replace(/\/+$/, '')
try {
  const response = await fetch(`${apiUrl}/health`, { signal: AbortSignal.timeout(3000) })
  if (response.ok) ok(`API reachable at ${apiUrl}`)
  else warn(`API at ${apiUrl} answered ${response.status}`, 'run `npm run doctor` in api-gc')
} catch {
  warn(`API not reachable at ${apiUrl} (the store will show errors)`, 'start it: cd ../api-gc && npm run dev')
}

// Report
const problems = results.filter(result => result.level !== 'ok')
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
