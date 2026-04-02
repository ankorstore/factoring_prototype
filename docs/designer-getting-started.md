# DS Prototype — Getting Started

Guide for designers to set up a prototype project. One-time setup takes ~10 minutes.

## Prerequisites

- **GitHub account** with access to `ankorstore` org
- **Claude** desktop app or terminal (already includes Node.js)

## Step 1: JFrog Access (one-time)

Our design system is a private npm package. You need a token to download it.

1. Open [ankorstore.jfrog.io](https://ankorstore.jfrog.io)
2. Log in with your Ankorstore SSO
3. Click your **profile icon** (top right) → **Edit Profile**
4. Scroll to **Authentication Settings** → Click **Generate Token**
5. Copy the token (you won't see it again)

Now add it to your machine. Open **Terminal** and paste this command (replace `YOUR_TOKEN`):

```bash
echo '//ankorstore.jfrog.io/artifactory/api/npm/npm-virtual/:_authToken=YOUR_TOKEN' >> ~/.npmrc
```

**Important:** Never share this token with anyone or paste it into Claude.

## Step 2: Create Your Project

1. Go to [ds-prototype-template on GitHub](https://github.com/ankorstore/ds-prototype-template)
2. Click the green **"Use this template"** button → **"Create a new repository"**
3. Name it: `{feature}-prototype` (e.g., `checkout-prototype`)
4. Set owner to **ankorstore**, visibility **Private**
5. Click **Create repository**

## Step 3: Clone & Setup

In Terminal, run:

```bash
git clone git@github.com:ankorstore/{your-repo-name}.git
cd {your-repo-name}
bash scripts/setup.sh
```

The setup script checks your access, installs dependencies, and starts the dev server.

If it says "Cannot access registry" → go back to Step 1.

## Step 4: Start Designing with Claude

Open Claude (desktop app or terminal) in your project folder. Claude knows:
- All available DS components and their props
- How to create pages and routes
- The two layout options (Default and Connected)
- Design tokens (colors, spacing, typography)

**Example prompts:**
- "Create a new page for the checkout flow"
- "Add a data table showing transaction history"
- "Show me what DS components are available for forms"
- "Switch this page to use the Connected layout"

## Layouts

| Layout | Description | When to use |
|--------|-------------|-------------|
| **Default** | Simple sidebar + breadcrumb topbar | Landing pages, simple prototypes |
| **Connected** | Backoffice sidebar + topbar shell | Authenticated/dashboard pages |

## Design Token Showcase

Browse all available tokens at:
- `http://localhost:3000/showcase/colors`
- `http://localhost:3000/showcase/typography`
- `http://localhost:3000/showcase/spacing`

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Cannot access registry" | Re-do Step 1, check token in `~/.npmrc` |
| "command not found: git" | Install Git: `xcode-select --install` (Mac) |
| "permission denied" on clone | Add SSH key to GitHub: [guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) |
| Dev server won't start | Run `npm install` first, then `npm run dev` |

## Getting Help

- Ask Claude — it has full context of this project
- Slack: `#product-design-system` channel
- Your tech lead can help with git/terminal issues
