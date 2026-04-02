# DS Prototype Template

Build static prototypes using the Ankorstore Design System. Designed for designers working with Claude.

## Prerequisites

- Node.js 20+
- Artifactory access (for `@ankorstore/design-system`)

## Quick Start

```bash
# 1. Create your project from this template (click "Use this template" on GitHub)
# 2. Clone and install
git clone <your-repo-url> && cd <your-repo>
npm install

# 3. Start dev server
npm run dev
# Open http://localhost:3000
```

## Using with GitHub Codespaces

1. Click **Code → Codespaces → Create codespace** on the repo
2. Wait for setup to complete, then run `npm run dev`

> **Note:** You need to set `NPM_TOKEN` in your Codespaces secrets for Artifactory authentication.

## Using with Claude

This repo includes a `CLAUDE.md` with full component reference and recipes. Claude will:
- Use only DS components (no raw HTML)
- Follow file conventions automatically
- Create pages, fixtures, and routes correctly

Just describe what you want: _"Create a product catalog page with a grid of cards and filters"_

## Documentation

Full documentation is in the `docs/` directory:

- **[Project Overview & PDR](./docs/project-overview-pdr.md)** — Features, requirements, success metrics
- **[Code Standards](./docs/code-standards.md)** — Naming conventions, Vue 3 patterns, TypeScript best practices
- **[System Architecture](./docs/system-architecture.md)** — Component hierarchy, data flow, design patterns
- **[Deployment Guide](./docs/deployment-guide.md)** — GitHub Pages setup, CI/CD, troubleshooting
- **[Design Guidelines](./docs/design-guidelines.md)** — Component usage, design tokens, responsive design
- **[Codebase Summary](./docs/codebase-summary.md)** — File structure, dependencies, code metrics

## Project Structure

```
src/
├── pages/          # Page components (one per route)
├── components/     # Reusable components
├── layouts/        # Main layout wrapper
├── data/           # JSON fixtures + TypeScript types
├── styles/         # Design tokens (CSS custom properties)
├── router.ts       # Route definitions
└── main.ts         # App initialization
```

**File size target:** Keep components under 200 LOC for optimal context management.

## Quick Tasks

### Adding a New Page
1. Create `src/pages/MyPage.vue`
2. Add route to `src/router.ts`
3. Add nav link to `src/components/AppSidebar.vue`
4. (Optional) Create `src/data/my-data.json` + interface in `types.ts`

See `CLAUDE.md` for component recipes and examples.

### Updating the Design System
```bash
npm run upgrade-ds
```

### Deploying to GitHub Pages
```bash
npm run deploy      # Build + push dist/ to gh-pages branch
```
Then in repo **Settings → Pages**, set source to **"Deploy from a branch"** → `gh-pages` / `/ (root)`.

### Building for Production
```bash
npm run build       # Type check + minify
npm run preview     # Test production build locally
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `npm install` fails with 401 | Set Artifactory auth: `npm config set //ankorstore.jfrog.io/artifactory/api/npm/npm-virtual/:_auth <TOKEN>` |
| Port 3000 in use | Kill the process: `lsof -ti:3000 \| xargs kill -9` or change port in `vite.config.ts` |
| DS components not rendering | Verify `@ankorstore/design-system` CSS is imported in `main.ts` |
| Deployment to GitHub Pages fails | Ensure GitHub Pages source is set to `gh-pages` branch in repo settings |

See **[Deployment Guide](./docs/deployment-guide.md)** for more detailed troubleshooting.
