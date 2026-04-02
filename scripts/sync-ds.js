#!/usr/bin/env node

/**
 * sync-ds.js — Generates design token files from the sibling design-system repo.
 *
 * Reads:  ../design-system/tailwind.config.js, colors.css, package.json
 * Writes: src/styles/design-tokens.css, src/data/design-tokens.json
 *
 * Usage:  npm run sync-ds
 * Override DS path: DS_PATH=/path/to/ds npm run sync-ds
 */

import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const ROOT = process.cwd()
const dsPath = process.env.DS_PATH || path.resolve(ROOT, '../design-system')

// --- Validate DS repo exists ---
if (!fs.existsSync(dsPath)) {
  console.error(`Design system not found at "${dsPath}".`)
  console.error('Set DS_PATH env var to the correct location.')
  process.exit(1)
}

const twConfigPath = path.resolve(dsPath, 'tailwind.config.js')
if (!fs.existsSync(twConfigPath)) {
  console.error(`tailwind.config.js not found at "${twConfigPath}"`)
  process.exit(1)
}

// --- Resolve DS version ---
function resolveVersion() {
  const paths = [
    path.resolve(dsPath, 'package.json'),
    path.resolve(ROOT, 'node_modules/@ankorstore/design-system/package.json'),
  ]
  for (const p of paths) {
    try {
      const pkg = JSON.parse(fs.readFileSync(p, 'utf8'))
      if (pkg.version) return pkg.version
    } catch { /* skip */ }
  }
  return 'unknown'
}

// --- Parse tailwind.config.js ---
async function loadTailwindConfig() {
  const configModule = await import(pathToFileURL(twConfigPath).href)
  return configModule.default
}

// --- Parse colors.css ---
function parseCssColors() {
  const colorsPath = path.resolve(dsPath, 'src/styles/abstracts/colors.css')
  if (!fs.existsSync(colorsPath)) {
    console.warn('colors.css not found, skipping CSS color values')
    return new Map()
  }
  const css = fs.readFileSync(colorsPath, 'utf8')
  const map = new Map()
  const re = /--([\w-]+)\s*:\s*([^;]+);/g
  let m
  while ((m = re.exec(css)) !== null) {
    map.set(m[1], m[2].trim())
  }
  return map
}

// --- Color grouping ---
function colorGroup(name) {
  if (['primary', 'white'].includes(name)) return 'foundation'
  if (name.startsWith('neutral')) return 'neutral'
  const functional = ['error', 'warning', 'success', 'info', 'accent', 'discount']
  if (functional.some(f => name === f || name.startsWith(f + '-'))) return 'functional'
  return 'special'
}

// --- Flatten Tailwind colors to { name, hex } entries ---
function flattenColors(colors, prefix = '') {
  const entries = []
  for (const [key, value] of Object.entries(colors)) {
    if (key === 'current' || key === 'transparent') continue
    const name = prefix ? `${prefix}-${key}` : key
    if (typeof value === 'string') {
      entries.push({ name, hex: value })
    } else if (typeof value === 'object') {
      // Handle DEFAULT key
      if (value.DEFAULT) {
        entries.push({ name, hex: value.DEFAULT })
      }
      for (const [subKey, subValue] of Object.entries(value)) {
        if (subKey === 'DEFAULT') continue
        if (typeof subValue === 'string') {
          entries.push({ name: `${name}-${subKey}`, hex: subValue })
        }
      }
    }
  }
  return entries
}

// --- Px conversion ---
function toPx(value) {
  if (typeof value === 'number') return value
  const str = String(value)
  if (str.endsWith('rem')) return Math.round(parseFloat(str) * 16)
  if (str.endsWith('px')) return parseFloat(str)
  return 0
}

// --- Spacing key to CSS var name ---
function spacingVarName(key) {
  return `--space-${String(key).replace('.', '-')}`
}

// --- Sort spacing keys in logical order (px, 0, 0.5, 1, 1.5, ...) ---
function sortSpacingEntries(entries) {
  return entries.sort((a, b) => {
    const [ka, kb] = [a[0], b[0]]
    if (ka === 'px') return -1
    if (kb === 'px') return 1
    const na = parseFloat(ka), nb = parseFloat(kb)
    if (isNaN(na) && isNaN(nb)) return ka.localeCompare(kb)
    if (isNaN(na)) return 1
    if (isNaN(nb)) return -1
    return na - nb
  })
}

// --- Merge theme + theme.extend safely ---
function mergeTheme(config) {
  const theme = config.theme ?? {}
  const ext = theme.extend ?? {}
  return {
    spacing: { ...theme.spacing, ...ext.spacing },
    fontSize: { ...theme.fontSize, ...ext.fontSize },
    borderRadius: { ...theme.borderRadius, ...ext.borderRadius },
    colors: { ...theme.colors, ...ext.colors },
  }
}

// --- Generate design-tokens.json ---
function buildJsonData(config, cssColors, version) {
  const { spacing, fontSize, borderRadius, colors: twColors } = mergeTheme(config)

  // Colors: merge Tailwind hex + CSS rgba
  const twFlat = flattenColors(twColors)
  const colorTokens = twFlat.map(({ name, hex }) => ({
    name,
    group: colorGroup(name),
    cssVar: `--${name}`,
    cssValue: cssColors.get(name) || '',
    tailwindHex: hex,
  }))
  // Add CSS-only colors not in Tailwind
  for (const [name, value] of cssColors) {
    if (!twFlat.find(c => c.name === name)) {
      colorTokens.push({
        name,
        group: colorGroup(name),
        cssVar: `--${name}`,
        cssValue: value,
        tailwindHex: '',
      })
    }
  }
  // Sort: foundation > neutral > functional > special, then alphabetically
  const groupOrder = { foundation: 0, neutral: 1, functional: 2, special: 3 }
  colorTokens.sort((a, b) => (groupOrder[a.group] - groupOrder[b.group]) || a.name.localeCompare(b.name))

  // Spacing
  const spacingTokens = sortSpacingEntries(Object.entries(spacing)).map(([key, value]) => ({
    name: String(key),
    cssVar: spacingVarName(key),
    value,
    px: toPx(value),
  }))

  // Typography
  const typographyTokens = Object.entries(fontSize).map(([name, tuple]) => {
    const [size, lineHeight] = Array.isArray(tuple) ? tuple : [tuple, tuple]
    return {
      name,
      cssVar: `--text-${name}`,
      size,
      sizePx: toPx(size),
      lineHeight,
      lineHeightPx: toPx(lineHeight),
    }
  })

  // Radius
  const radiusTokens = Object.entries(borderRadius).map(([name, value]) => ({
    name,
    cssVar: `--radius-${name}`,
    value,
    valuePx: toPx(value),
  }))

  return {
    version,
    syncDate: new Date().toISOString().slice(0, 10),
    colors: colorTokens,
    spacing: spacingTokens,
    typography: typographyTokens,
    radius: radiusTokens,
  }
}

// --- Generate design-tokens.css ---
function buildCss(config, cssColors, version) {
  const { spacing, fontSize, borderRadius } = mergeTheme(config)
  const date = new Date().toISOString().slice(0, 10)
  const lines = []

  lines.push(`/* DS v${version} — synced ${date} */`)
  lines.push(`/* ============================================
   Design Tokens — DS Prototype Template
   CSS custom properties for spacing, typography, radius + color reference.
   Colors come from @ankorstore/design-system/dist/design-system.css (auto-loaded).
   ============================================ */`)
  lines.push('')

  // Spacing
  lines.push('/* --- Spacing (4px grid from DS config) --- */')
  const spaceVars = sortSpacingEntries(Object.entries(spacing))
    .map(([key, val]) => `  ${spacingVarName(key)}: ${val};`)
    .join('\n')
  lines.push(`:root {\n${spaceVars}\n}`)
  lines.push('')

  // Typography
  lines.push('/* --- Typography --- */')
  const typoVars = [`  --font-family: 'Poppins', sans-serif;`]
  for (const [name, tuple] of Object.entries(fontSize)) {
    const [size, lh] = Array.isArray(tuple) ? tuple : [tuple, tuple]
    const textVar = `--text-${name}`
    const leadVar = `--leading-${name}`
    // Align columns: pad text var+value to 23 chars
    const left = `${textVar}: ${size};`
    typoVars.push(`  ${left.padEnd(23)} ${leadVar}: ${lh};`)
  }
  lines.push(`:root {\n${typoVars.join('\n')}\n}`)
  lines.push('')

  // Radius
  lines.push('/* --- Border Radius --- */')
  const radiusVars = Object.entries(borderRadius)
    .map(([name, val]) => `  --radius-${name}: ${val};`)
    .join('\n')
  lines.push(`:root {\n${radiusVars}\n}`)
  lines.push('')

  // Colors comment block
  lines.push('/* --- Colors --- */')
  lines.push('/* DS exports these as CSS custom properties via colors.css (use directly via var(--name)):')
  lines.push('   Source: design-system/src/styles/abstracts/colors.css')
  lines.push('')
  const groups = { foundation: [], neutral: [], functional: [], special: [] }
  for (const [name, value] of cssColors) {
    groups[colorGroup(name)].push({ name, value })
  }
  const groupLabels = { foundation: 'Foundation', neutral: 'Neutrals', functional: 'Functional', special: 'Special' }
  for (const [group, items] of Object.entries(groups)) {
    if (items.length === 0) continue
    lines.push(`   ${groupLabels[group]}:`)
    for (const { name, value } of items) {
      lines.push(`   --${name.padEnd(24)} ${value}`)
    }
    lines.push('')
  }
  lines.push('   NOTE: Tailwind config hex values differ from CSS var rgba values for some neutrals.')
  lines.push('   Always reference CSS vars in <style scoped>, not hardcoded hex.')
  lines.push('*/')
  lines.push('')

  // Gap-filler
  lines.push('/* Gap-filler: DS has no --neutral-200 CSS var for #F0F0F0 border color */')
  lines.push(':root {\n  --color-border-light: #F0F0F0;\n}')
  lines.push('')

  // Breakpoints comment
  lines.push('/* Breakpoints: xs=480px sm=640px md=768px lg=1024px xl=1280px 2xl=1600px */')
  lines.push('')

  // Layout utilities (hardcoded, not derived from DS)
  lines.push('/* --- Layout Utilities --- */')
  lines.push(`.flex { display: flex; }
.flex-col { display: flex; flex-direction: column; }
.flex-row { display: flex; flex-direction: row; }
.flex-wrap { flex-wrap: wrap; }
.flex-1 { flex: 1; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.grid { display: grid; }
.gap-1 { gap: var(--space-1); }
.gap-2 { gap: var(--space-2); }
.gap-3 { gap: var(--space-3); }
.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }
.gap-8 { gap: var(--space-8); }
.text-center { text-align: center; }
.text-right { text-align: right; }
.hidden { display: none; }
.w-full { width: 100%; }`)

  return lines.join('\n') + '\n'
}

// --- Main ---
async function main() {
  console.log(`Syncing from: ${dsPath}`)

  const version = resolveVersion()
  console.log(`DS version: ${version}`)

  const config = await loadTailwindConfig()
  const cssColors = parseCssColors()

  // Generate JSON
  const jsonData = buildJsonData(config, cssColors, version)
  const jsonPath = path.resolve(ROOT, 'src/data/design-tokens.json')
  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2) + '\n')
  console.log(`Wrote ${jsonPath} (${jsonData.colors.length} colors, ${jsonData.spacing.length} spacing, ${jsonData.typography.length} typography, ${jsonData.radius.length} radius)`)

  // Generate CSS
  const css = buildCss(config, cssColors, version)
  const cssPath = path.resolve(ROOT, 'src/styles/design-tokens.css')
  fs.writeFileSync(cssPath, css)
  console.log(`Wrote ${cssPath}`)

  console.log('Sync complete.')
}

main().catch(err => {
  console.error('Sync failed:', err.message)
  process.exit(1)
})
