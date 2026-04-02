#!/usr/bin/env node

/**
 * Scans source files for sensitive/identifiable data patterns.
 * Used as pre-commit hook, CI check, and manual audit tool.
 *
 * Usage:
 *   node scripts/scan-sensitive-data.mjs          # scan src/
 *   node scripts/scan-sensitive-data.mjs --staged  # scan only staged files
 *
 * Exit code 0 = clean, 1 = findings detected
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import { execSync } from 'child_process'

const SCAN_DIR = 'src'
const SCAN_EXTENSIONS = new Set(['.json', '.ts', '.vue', '.js', '.tsx', '.jsx', '.css'])

// Patterns that indicate sensitive data
const PATTERNS = [
  {
    name: 'Real email address',
    regex: /[a-zA-Z0-9._%+-]+@(?!example\.com\b)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    severity: 'error',
  },
  {
    name: 'Phone number',
    regex: /(?<![#\d])\+\d{1,3}[\s-]?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}(?!\d)/g,
    severity: 'warn',
  },
  {
    name: 'IBAN',
    regex: /\b[A-Z]{2}\d{2}[\s]?\d{4}[\s]?\d{4}[\s]?\d{4}[\s]?\d{4}[\s]?\d{0,4}\b/g,
    severity: 'error',
    // Allow test IBANs (all zeros)
    validate: (match) => !/^[A-Z]{2}\d{2}[\s]?0{4}/.test(match),
  },
  {
    name: 'Internal Ankorstore URL',
    regex: /https?:\/\/(?:backoffice|admin|internal|api-internal)[.\w-]*\.ankorstore\.com/gi,
    severity: 'error',
  },
  {
    name: 'API key / secret / token in string',
    regex: /(?:api[_-]?key|secret|token|password|credential)[\s]*[=:]\s*["'][^"']{8,}["']/gi,
    severity: 'error',
  },
  {
    name: 'Embedded .env content',
    regex: /^[A-Z_]+=\S+$/gm,
    severity: 'warn',
    // Only flag in non-.env files that look like env var assignments
    validate: (match) => /^(?:DB_|API_|SECRET_|TOKEN_|AWS_|VITE_.*KEY)/.test(match),
  },
  {
    name: 'VAT number',
    regex: /\b(?:FR|DE|ES|IT|NL|BE|AT|GB|IE)\d{8,11}\b/g,
    severity: 'warn',
  },
  {
    name: 'SSN-like pattern',
    regex: /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/g,
    severity: 'warn',
    validate: (match) => !/^0{3}|^000/.test(match),
  },
]

// Files/patterns to ignore
const IGNORE_PATHS = [
  'node_modules',
  'dist',
  '.git',
  'scripts/scan-sensitive-data.mjs', // don't scan self
]

function getAllFiles(dir) {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (IGNORE_PATHS.some((p) => fullPath.includes(p))) continue
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath))
    } else if (SCAN_EXTENSIONS.has(extname(entry.name))) {
      files.push(fullPath)
    }
  }
  return files
}

function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', {
      encoding: 'utf-8',
    })
    return output
      .trim()
      .split('\n')
      .filter((f) => f && SCAN_EXTENSIONS.has(extname(f)))
      .filter((f) => !IGNORE_PATHS.some((p) => f.includes(p)))
  } catch {
    return []
  }
}

function scanFile(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const findings = []

  for (const pattern of PATTERNS) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      let match
      pattern.regex.lastIndex = 0
      while ((match = pattern.regex.exec(line)) !== null) {
        if (pattern.validate && !pattern.validate(match[0])) continue
        findings.push({
          file: filePath,
          line: i + 1,
          column: match.index + 1,
          match: match[0],
          pattern: pattern.name,
          severity: pattern.severity,
        })
      }
    }
  }

  return findings
}

// Main
const isStaged = process.argv.includes('--staged')
const files = isStaged ? getStagedFiles() : getAllFiles(SCAN_DIR)

if (files.length === 0) {
  console.log('No files to scan.')
  process.exit(0)
}

let allFindings = []
for (const file of files) {
  try {
    allFindings.push(...scanFile(file))
  } catch {
    // skip unreadable files
  }
}

// Filter to errors only for exit code (warnings are informational)
const errors = allFindings.filter((f) => f.severity === 'error')
const warnings = allFindings.filter((f) => f.severity === 'warn')

if (allFindings.length === 0) {
  console.log(`✓ Scanned ${files.length} files — no sensitive data found.`)
  process.exit(0)
}

console.log(`\nSensitive data scan results (${files.length} files):\n`)

for (const f of allFindings) {
  const icon = f.severity === 'error' ? '✗' : '⚠'
  console.log(`  ${icon} ${f.file}:${f.line}:${f.column}`)
  console.log(`    [${f.severity.toUpperCase()}] ${f.pattern}: ${f.match}`)
}

console.log(`\nSummary: ${errors.length} error(s), ${warnings.length} warning(s)`)

if (errors.length > 0) {
  console.log('\nBlocking: fix errors before committing/deploying.')
  process.exit(1)
}

console.log('\nWarnings only — review but not blocking.')
process.exit(0)
