#!/bin/bash
# DS Prototype Template — First-time setup
# Run: bash scripts/setup.sh

set -e

echo "=== DS Prototype Template Setup ==="
echo ""

# Check Node
if ! command -v node &> /dev/null; then
  echo "ERROR: Node.js is not installed."
  echo "Install it from https://nodejs.org/ (LTS version recommended)."
  exit 1
fi
echo "Node: $(node --version)"

# Check npm registry auth
echo ""
echo "Checking access to @ankorstore private registry..."
if npm view @ankorstore/design-system version --silent 2>/dev/null; then
  echo "Registry access OK."
else
  echo ""
  echo "ERROR: Cannot access @ankorstore private registry."
  echo ""
  echo "You need to configure your JFrog access token in ~/.npmrc"
  echo "Follow the Notion guide: \"DS Prototype — Getting Started\""
  echo ""
  echo "Quick steps:"
  echo "  1. Go to https://ankorstore.jfrog.io → Profile → Generate Token"
  echo "  2. Add this line to ~/.npmrc (create the file if it doesn't exist):"
  echo "     //ankorstore.jfrog.io/artifactory/api/npm/npm-virtual/:_authToken=YOUR_TOKEN"
  echo ""
  echo "Then run this script again."
  exit 1
fi

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install

# Set user role for Claude communication style
if [ ! -f .env ]; then
  echo ""
  echo "One more thing — are you comfortable with code and technical terms?"
  echo "  1) Not really — keep it simple (designer mode, default)"
  echo "  2) Yes, I'm a developer"
  read -r -p "Choose [1/2]: " choice
  if [ "$choice" = "2" ]; then
    echo "USER_ROLE=developer" > .env
    echo "Set to developer mode."
  else
    echo "USER_ROLE=designer" > .env
    echo "Set to designer mode."
  fi
fi

# Start dev server
echo ""
echo "Setup complete! Starting dev server..."
echo "Open http://localhost:3000 in your browser."
echo ""
npm run dev
