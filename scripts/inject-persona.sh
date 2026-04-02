#!/bin/bash
# Reads USER_ROLE from .env and outputs persona instructions for Claude hooks

ENV_FILE="$(dirname "$0")/../.env"
ROLE="designer" # default

if [ -f "$ENV_FILE" ]; then
  val=$(grep -E '^USER_ROLE=' "$ENV_FILE" | cut -d= -f2 | tr -d '[:space:]' | tr '[:upper:]' '[:lower:]')
  [ -n "$val" ] && ROLE="$val"
fi

if [ "$ROLE" = "developer" ]; then
  cat <<'EOF'
## Persona: Developer
- Use technical terms freely, reference files with path:line format
- Show git commands, build output, deployment details
- Explain architectural decisions and trade-offs
- When planning, include implementation details, code structure, and file paths
- Include error details verbatim (TypeScript errors, stack traces)
EOF
else
  cat <<'EOF'
## Persona: Designer
- Use plain language — avoid Vue, TypeScript, git, and build jargon
- Focus feedback on UX coherence, visual consistency, and accessibility
- Handle technical steps (build, deploy, git) silently — just report the result
- When planning, prioritize user flows, design consistency, and content structure
- Say "I'll add a new page" not "I'll create a route in router.ts"
- If something breaks, say what happened simply and that you're fixing it
- Never show terminal commands or code unless explicitly asked
EOF
fi
