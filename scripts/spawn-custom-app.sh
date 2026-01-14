#!/bin/bash
# scripts/spawn-custom-app.sh

NEW_APP_NAME=$1
if [ -z "$NEW_APP_NAME" ]; then
    echo "Usage: ./spawn-custom-app.sh <app-name>"
    exit 1
fi

BOILERPLATE_DIR="$(pwd)"
NEW_APP_DIR="../$NEW_APP_NAME"

# Check if target already exists
if [ -d "$NEW_APP_DIR" ]; then
    echo "❌ Directory ../$NEW_APP_NAME already exists"
    exit 1
fi

# Check if exclusion file exists
if [ ! -f ".spawn-exclude" ]; then
    echo "❌ .spawn-exclude file not found"
    exit 1
fi

echo "🚀 Spawning new app: $NEW_APP_NAME"
echo ""

# Create new directory
mkdir -p "$NEW_APP_DIR"

# Copy everything except exclusions
rsync -av --exclude-from='.spawn-exclude' ./ "$NEW_APP_DIR/"

cd "$NEW_APP_DIR"

# Get boilerplate version info
BOILERPLATE_VERSION=$(git -C "$BOILERPLATE_DIR" describe --tags --always 2>/dev/null || echo "untagged")
BOILERPLATE_COMMIT=$(git -C "$BOILERPLATE_DIR" rev-parse --short HEAD 2>/dev/null || echo "unknown")

# Create provenance documentation
cat > BOILERPLATE.md << EOF
# Boilerplate Provenance

- **Source**: react-vite-skeleton
- **Repository**: https://github.com/yourusername/react-vite-skeleton
- **Version**: $BOILERPLATE_VERSION
- **Commit**: $BOILERPLATE_COMMIT
- **Forked**: $(date +%Y-%m-%d)

## Initial Features
- React 18 + Vite + TypeScript
- [List your boilerplate features here]

## Purpose
This app was scaffolded from react-vite-skeleton and is now independently maintained.
The boilerplate PROMPT.md has been removed as it is no longer relevant to this project.

## Divergences from Boilerplate
_(Document custom changes here as development progresses)_

- 
EOF

# Initialize git
git init
git add .
git commit -m "Initial fork from react-vite-skeleton $BOILERPLATE_VERSION"

echo ""
echo "✅ New app created: $NEW_APP_DIR"
echo "📦 Version: $BOILERPLATE_VERSION ($BOILERPLATE_COMMIT)"
echo "📝 Excluded files per .spawn-exclude"
echo "📝 Created BOILERPLATE.md"
echo ""
echo "Next steps:"
echo "  cd ../$NEW_APP_NAME"
echo "  npm install"
echo "  git remote add origin <your-repo-url>"
echo "  git push -u origin main"