# Deployment Guide

## Overview

DS Prototype Template deploys to GitHub Pages automatically via GitHub Actions on every push to `master`.

## Prerequisites

- GitHub account with repository access
- Node.js 20+ installed locally
- Git installed and configured
- `@ankorstore/design-system` access (Artifactory token)
- `JF_NPM_TOKEN` org-level secret accessible to the repo

## Quick Start Deployment

### 1. From Template (First-Time Setup)

```bash
# Click "Use this template" on GitHub to create your own repo
# Then clone locally:
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO

# Install dependencies
npm install

# Start dev server to verify setup
npm run dev
# Visit http://localhost:3000
```

### 2. Enable GitHub Pages (First Deploy Only)

Configure Pages to use GitHub Actions as the source:
```bash
gh api repos/OWNER/REPO/pages -X PUT -f build_type="workflow"
```

Or manually: **Settings → Pages → Source → "GitHub Actions"**

### 3. Deploy

Push to `master` — deployment is automatic:
```bash
git add .
git commit -m "feat: add new prototype"
git push origin master
```

Or trigger manually: `gh workflow run deploy-pages.yml`

**Result:** Live at the URL shown in **Settings → Pages**

## Local Development & Testing

### Development Server
```bash
npm run dev
# Starts Vite dev server on http://localhost:3000
# Hot reload enabled; changes appear instantly
```

### Type Checking
```bash
npm run build
# Runs: vue-tsc --noEmit && vite build
# Reports all type errors before deployment
```

### Preview Production Build
```bash
npm run preview
# Builds production bundle and serves locally
# Use to verify build output before pushing
```

## Build Process

### Build Command
```bash
npm run build
```

### Build Steps (in order)
1. **Type Check** — `vue-tsc --noEmit`
   - Validates all TypeScript
   - Reports errors; stops if issues found

2. **Production Build** — `vite build`
   - Compiles Vue components to JavaScript
   - Minifies CSS and JavaScript
   - Creates hash-based asset names for cache busting
   - Outputs to `dist/` directory

3. **Output Files**
   ```
   dist/
   ├── index.html          # Main entry point (never cached)
   ├── .nojekyll           # Disables Jekyll processing
   ├── assets/
   │   ├── index-XXXX.js   # Main app bundle (hashed)
   │   ├── style-XXXX.css  # Combined styles (hashed)
   │   └── ...
   └── (static assets from public/)
   ```

### Build Time
- Type checking: ~2 seconds
- Vite build: ~5 seconds
- **Total: < 10 seconds**

## GitHub Pages Configuration

### Automatic (via GitHub Actions)

The `.github/workflows/deploy-pages.yml` workflow handles deployment:
1. Triggers on push to `master` or manual `workflow_dispatch`
2. Installs dependencies (using `JF_NPM_TOKEN` org secret for Artifactory)
3. Builds the project (`npm run build`)
4. Uploads `dist/` as a Pages artifact
5. Deploys to GitHub Pages via `actions/deploy-pages`

**First-time setup:**
```bash
# Enable Pages with GitHub Actions source
gh api repos/OWNER/REPO/pages -X PUT -f build_type="workflow"
```

### Manual Fallback

The `npm run deploy` script is still available for local deployment:
```bash
npm run deploy
# Runs: npm run build && gh-pages -d dist --dotfiles
```

### Custom Domain (Optional)

1. Go to **Settings → Pages**
2. Under "Custom domain", enter your domain
3. Add DNS record pointing to GitHub Pages IP

### Base URL Configuration

**Default:** Site is served at the root of the Pages domain.

**In Code:** Vite base is `/` by default. Vue Router uses `import.meta.env.BASE_URL`.

## GitHub Codespaces Setup

### Create Codespace

1. Click **Code → Codespaces → Create codespace on main**
2. Wait for environment initialization (~2 minutes)

### Authenticate Artifactory

Before `npm install`, set your Artifactory token:
```bash
npm config set //ankorstore.jfrog.io/artifactory/api/npm/npm-virtual/:_auth <YOUR_TOKEN>
```

### Set Codespaces Secret

1. Go to **Settings → Secrets and variables → Codespaces**
2. Create new secret: `NPM_TOKEN` = your Artifactory token

### Run in Codespaces

```bash
npm install
npm run dev
# Port 3000 is automatically forwarded
```

## Environment Variables

### Build-Time Variables

**None required for standard deployment.** The GitHub Actions workflow handles everything.

### Runtime Variables

**None required.** This is a static prototype; no API keys or secrets needed.

### CI/CD Secrets

| Secret | Level | Purpose |
|--------|-------|---------|
| `JF_NPM_TOKEN` | Org | Artifactory auth for `@ankorstore/design-system` |

## Troubleshooting Deployments

### Build Fails: Type Errors

**Error:** `error TS2339: Property 'xyz' does not exist on type 'Order'`

**Fix:**
1. Check `src/data/types.ts` — is interface correct?
2. Check JSON fixture — does it match interface?
3. Run `npm run build` to verify

### Build Fails: Module Not Found

**Error:** `error TS2307: Cannot find module '@/data/xyz'`

**Fix:**
1. Verify file path: `/src/data/xyz.json` exists
2. Check import path: `import x from '@/data/xyz.json'`

### Workflow Fails: npm ci E401

**Cause:** `JF_NPM_TOKEN` org secret not accessible to this repo.

**Fix:** Ask an org admin to grant the repo access to the `JF_NPM_TOKEN` secret.

### JS Files Return 404 (files starting with `_`)

**Cause:** Jekyll processing ignores files/directories starting with `_`.

**Fix:** Ensure `public/.nojekyll` exists. This file is copied to `dist/` during build.

### Build Succeeds but Page Doesn't Load

**Check:**
1. Verify workflow completed: `gh run list --workflow=deploy-pages.yml --limit 1`
2. Verify Pages source is "GitHub Actions": **Settings → Pages**
3. Wait 1-2 minutes for GitHub Pages CDN to update

**Fix:**
- Hard refresh (Ctrl+Shift+R)
- Check browser console (F12) for errors

### 404 on Subpages (/orders, /orders/:id)

**Cause:** GitHub Pages doesn't know about Vue Router routes.

**Fix:** Create `dist/404.html` that copies `index.html`. Vue Router takes over client-side.

### CSS/Colors Look Wrong

**Common causes:**
- Old `@ankorstore/design-system` in node_modules → `npm update @ankorstore/design-system`
- Browser cache → hard refresh

## Deployment History

```bash
# Via GitHub CLI
gh run list --workflow=deploy-pages.yml --limit 20

# Via GitHub UI
# Go to repository → Actions → "Deploy to GitHub Pages"
```

## Rollback

```bash
# Re-run a previous successful workflow
gh run rerun <run-id>

# Or revert changes and push
git revert HEAD
git push origin master
```

## Performance & Caching

**GitHub Pages CDN caches:**
- `assets/index-XXXX.js` — cached forever (hash in name)
- `assets/style-XXXX.css` — cached forever (hash in name)
- `index.html` — never cached (always fresh)

**Already configured:**
- Tree-shaking, code splitting, CSS/JS minification
- Asset hashing: `assets/[name]-[hash].js`

---

**Last Updated:** 2026-03-27
**Deployment Platform:** GitHub Pages (CDN-served static assets)
**Deployment Method:** GitHub Actions (automatic on push to master)
