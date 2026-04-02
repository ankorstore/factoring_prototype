# Documentation Index

Welcome to the DS Prototype Template documentation. This directory contains comprehensive guides for developers, designers, and contributors.

## Quick Navigation

### For New Developers
1. Start with **[README.md](../README.md)** — Quick start (5 min)
2. Read **[Project Overview & PDR](./project-overview-pdr.md)** — Understand the project (10 min)
3. Review **[Code Standards](./code-standards.md)** — Learn coding conventions (15 min)
4. Check **[CLAUDE.md](../CLAUDE.md)** — Component reference (reference as needed)

### For Implementation
1. **[Code Standards](./code-standards.md)** — Naming, patterns, Vue 3 practices
2. **[Design Guidelines](./design-guidelines.md)** — Component usage and styling
3. **[System Architecture](./system-architecture.md)** — Component structure and data flow
4. **[Codebase Summary](./codebase-summary.md)** — File organization and dependencies

### For Deployment & DevOps
1. **[Deployment Guide](./deployment-guide.md)** — GitHub Pages setup, manual deployment, troubleshooting
2. **[System Architecture](./system-architecture.md)** — Build pipeline overview

### For Design & UX
1. **[Design Guidelines](./design-guidelines.md)** — Component usage and examples
2. **[System Architecture](./system-architecture.md)** — Component hierarchy
3. **[CLAUDE.md](../CLAUDE.md)** — Full component catalog with props and events

## Documentation Files

| File | Size | Purpose |
|------|------|---------|
| **[project-overview-pdr.md](./project-overview-pdr.md)** | 254 LOC | Vision, features, requirements, success metrics |
| **[code-standards.md](./code-standards.md)** | 493 LOC | Coding conventions, patterns, best practices |
| **[system-architecture.md](./system-architecture.md)** | 461 LOC | Architecture, components, data flow, design patterns |
| **[deployment-guide.md](./deployment-guide.md)** | 420 LOC | GitHub Pages, manual deployment, environment setup, troubleshooting |
| **[design-guidelines.md](./design-guidelines.md)** | 707 LOC | Component usage, design tokens, styling, responsive |
| **[codebase-summary.md](./codebase-summary.md)** | 526 LOC | File structure, dependencies, code metrics, patterns |

**Total:** 2,921 lines across 6 docs (average 487 LOC per file, all under 800 LOC limit)

## Key Sections by Topic

### Vue 3 & TypeScript Development
- **Code Standards** → TypeScript standards, Vue 3 Composition API, script setup
- **Codebase Summary** → Common patterns, component examples, development workflow
- **System Architecture** → Component dependency graph, data flow patterns

### Component Development
- **Design Guidelines** → Ankorstore DS components, props, events, examples
- **Code Standards** → Component rules, props/emits, scoped styles
- **CLAUDE.md** → Full component reference with all props and events

### Styling & Design
- **Design Guidelines** → Design tokens, CSS patterns, responsive design, accessibility
- **Code Standards** → CSS custom properties, scoped styles, anti-patterns
- **CLAUDE.md** → Color reference, icon list

### Data Management
- **System Architecture** → Data flow, fixture loading, reactive state
- **Code Standards** → Type-safe fixtures, computed properties, filtering patterns
- **Codebase Summary** → Data models, fixture structure

### Routing & Navigation
- **System Architecture** → Route configuration, navigation flow, layout persistence
- **Code Standards** → Vue Router patterns
- **Deployment Guide** → Relative paths for GitHub Pages

### Testing & Quality
- **Code Standards** → Code quality, error handling, accessibility
- **Codebase Summary** → Code metrics, dependencies analysis

### Deployment & DevOps
- **Deployment Guide** → GitHub Pages setup, manual deployment, troubleshooting
- **System Architecture** → Build pipeline, performance characteristics
- **README.md** → Quick start, troubleshooting

## Common Questions

### "How do I add a new page?"
See **Code Standards** → "Creating a New Page" section or **CLAUDE.md** → "Creating a New Page"

### "How do I use DS components?"
See **Design Guidelines** → Component sections with examples

### "What design tokens should I use?"
See **Design Guidelines** → "Design Tokens" section (spacing, typography, colors, radius)

### "How do I deploy to GitHub Pages?"
See **Deployment Guide** → "GitHub Pages Configuration" and "Quick Start Deployment"

### "What's the file structure?"
See **Codebase Summary** → "Directory Structure" or **README.md** → "Project Structure"

### "How do I fix build errors?"
See **Deployment Guide** → "Troubleshooting Deployments"

### "What are the code standards?"
See **Code Standards** → All sections for naming, patterns, and best practices

### "How's the app structured?"
See **System Architecture** → "Architecture Overview" and "Component Hierarchy"

## Development Workflow

```
1. Setup (first time)
   → README.md (Quick Start)
   → Deployment Guide (GitHub Pages setup)

2. Development
   → Code Standards (coding conventions)
   → Design Guidelines (component usage)
   → Codebase Summary (file organization)
   → CLAUDE.md (component reference)

3. Implementation
   → System Architecture (design patterns)
   → Code Standards (coding patterns)
   → Design Guidelines (styling)

4. Testing
   → Run: npm run build
   → Run: npm run preview

5. Deployment
   → npm run deploy
   → Deployment Guide (troubleshooting if issues)
```

## File Ownership & Maintenance

All documentation files in this folder are maintained together and should be updated when:
- Code structure changes significantly
- New patterns are established
- Development workflow changes
- Build process updates
- Component library updates
- Deployment strategy changes

**Update Protocol:**
1. Make code changes
2. Update relevant doc section(s)
3. Verify links and code examples still work
4. Commit docs together with code changes

## Documentation Quality Standards

- **Accuracy:** All code examples and patterns verified against actual codebase
- **Clarity:** Written for both beginners and experienced developers
- **Examples:** Practical, runnable code snippets where appropriate
- **Navigation:** Cross-referenced with links to related sections
- **Completeness:** Cover all major development tasks and questions
- **Conciseness:** Information-dense without unnecessary verbosity
- **Size:** Individual files stay under 800 LOC for optimal reading

## External References

- **Vue 3 Docs:** https://vuejs.org/
- **Vue Router:** https://router.vuejs.org/
- **Vite:** https://vitejs.dev/
- **TypeScript:** https://www.typescriptlang.org/
- **Ankorstore Design System:** Check internal documentation or `src/llms-component-catalog.md`

## Getting Help

1. **For code questions:** Check relevant sections in Code Standards or CLAUDE.md
2. **For component usage:** See Design Guidelines or CLAUDE.md
3. **For deployment issues:** See Deployment Guide → Troubleshooting
4. **For architecture questions:** See System Architecture
5. **For file structure:** See Codebase Summary

---

**Last Updated:** 2026-03-27
**Status:** Complete documentation suite
**Next Review:** After next major version or significant architecture change
