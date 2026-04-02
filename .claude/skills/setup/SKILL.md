---
name: setup
description: Interactive first-time setup guide for designers. Checks registry access, installs dependencies, starts dev server, and shows example prompts. Use when user says "setup", "getting started", "first time", "can't install", or "npm error".
user_invocable: true
---

# DS Prototype — Interactive Setup

Guide designers through first-time project setup with step-by-step verification.

## Process

Run each step in order. Stop and help if any step fails.

### Step 1: Check Node.js

Run `node --version` via Bash.

- **If missing:** Tell user Node.js is required. They likely need to install Claude desktop app first (which includes Node), or install Node from https://nodejs.org/
- **If found:** Show version, proceed.

### Step 2: Check Registry Access

Run this via Bash:
```bash
npm view @ankorstore/design-system version 2>&1
```

- **If succeeds** (shows version number): Registry access is configured. Skip to Step 3.
- **If fails:** Guide through JFrog token setup (see Troubleshooting section below).

### Step 3: Install Dependencies

Run `npm install` via Bash.

- **If succeeds:** Proceed to Step 4.
- **If fails with 401/403:** Registry token issue — go to Troubleshooting.
- **If fails with other error:** Show error, help diagnose.

### Step 4: Start Dev Server

Run `npm run dev` in background via Bash.

Tell user: "Dev server is running at http://localhost:3000 — open it in your browser!"

### Step 5: Welcome & Example Prompts

After successful setup, show this message:

---

**You're all set! Here's what you can ask me:**

**Creating pages:**
- "Create a new page for [feature name]"
- "Add a dashboard page with stats cards and a data table"
- "Create a checkout flow with 3 steps"

**Using components:**
- "Show me what DS components are available for forms"
- "Add a modal confirmation dialog to this page"
- "Create a filter bar with search, date picker, and status dropdown"

**Working with data:**
- "Create mock data for a list of products"
- "Add a JSON fixture with 20 sample transactions"

**Layouts:**
- "Switch this page to use the Connected layout" (backoffice with sidebar)
- "Use the Default layout" (simple with breadcrumbs)

**Design tokens:**
- Visit `/showcase/colors`, `/showcase/typography`, `/showcase/spacing` to browse tokens
- "What colors are available in the design system?"

**Deploying:**
- "Deploy this prototype to GitHub Pages"

---

## Troubleshooting: JFrog Token

When registry access fails, guide the user through these steps **without asking them to share their token**:

### IMPORTANT: Never ask the user to paste their JFrog token into this chat.

Tell them:

1. **Generate a token:**
   - Open https://ankorstore.jfrog.io in your browser
   - Log in with your Ankorstore SSO credentials
   - Click your profile icon (top right) → Edit Profile
   - Scroll to "Authentication Settings" → Generate Token
   - Copy the token

2. **Add to your machine:**
   Tell them to open a **new terminal window** (not this one) and run:
   ```
   echo '//ankorstore.jfrog.io/artifactory/api/npm/npm-virtual/:_authToken=PASTE_YOUR_TOKEN_HERE' >> ~/.npmrc
   ```
   Replace `PASTE_YOUR_TOKEN_HERE` with the actual token.

3. **Verify it worked:**
   After they say they've done it, run the registry check again:
   ```bash
   npm view @ankorstore/design-system version 2>&1
   ```

### Common Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| `401 Unauthorized` | Token missing or expired | Regenerate token, update ~/.npmrc |
| `403 Forbidden` | Token valid but no read access | Ask admin to grant read access to npm-virtual repo |
| `ETIMEDOUT` or `ENOTFOUND` | Network/VPN issue | Check VPN connection, try again |
| `ERR! code E404` for `@ankorstore/*` | .npmrc in project missing | Check that `.npmrc` exists in project root with registry URL |
| Token works but `npm install` fails | Stale lockfile | Delete `node_modules` and `package-lock.json`, run `npm install` again |

### Verifying ~/.npmrc Without Exposing Token

To check the file exists and has content without reading the token:
```bash
grep -c "ankorstore.jfrog.io" ~/.npmrc 2>/dev/null && echo "Token line found" || echo "No token configured"
```

## Rules

- **NEVER** ask the user to paste their JFrog/npm token into the chat
- **NEVER** read or display the contents of `~/.npmrc` (it contains secrets)
- Always verify access by running `npm view` commands, not by reading config files
- Be patient and encouraging — the user may not be familiar with terminal commands
- If something fails, explain what went wrong in plain language before suggesting a fix
