#!/usr/bin/env bash
# Deploy script for unbox on VPS.
# Pulls the latest prod_changes branch, installs deps, builds, restarts PM2.
# Run from the project root: bash deploy.sh

set -euo pipefail

BRANCH="prod_changes"
APP_NAME="unbox"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$PROJECT_DIR"

echo "==> Deploying $APP_NAME from branch $BRANCH"
echo "==> Working dir: $PROJECT_DIR"

# Fail fast if working tree is dirty (avoid clobbering local edits on the server)
if [[ -n "$(git status --porcelain)" ]]; then
  echo "ERROR: working tree has uncommitted changes. Stash or commit before deploying." >&2
  git status --short
  exit 1
fi

echo "==> Fetching latest from origin"
git fetch origin "$BRANCH"

echo "==> Checking out $BRANCH"
git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"

echo "==> Installing dependencies (npm ci)"
npm ci

echo "==> Building React app"
npm run build

mkdir -p logs

if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
  echo "==> Restarting PM2 process: $APP_NAME"
  pm2 restart ecosystem.config.js --update-env
else
  echo "==> Starting PM2 process: $APP_NAME"
  pm2 start ecosystem.config.js
  pm2 save
fi

pm2 status "$APP_NAME"
echo "==> Deploy complete."
