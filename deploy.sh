#!/usr/bin/env bash

set -Eeuo pipefail

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"

REPO_URL="https://github.com/anand-shete/Blogify"
BRANCH="main"
REPO_DIR="$HOME/Blogify-repo"
APP_DIR="$HOME/blogify"
PM2_APP_NAME="blogify"

echo "=== Deployment Started ==="

if [ ! -d "$REPO_DIR/.git" ]; then
	git clone --branch "$BRANCH" --single-branch "$REPO_URL" "$REPO_DIR"
else
	git -C "$REPO_DIR" fetch origin "$BRANCH"
	git -C "$REPO_DIR" reset --hard "origin/$BRANCH"
	git -C "$REPO_DIR" clean -fd
fi

mkdir -p "$APP_DIR"

# Keep .env in deployed app directory while syncing fresh backend files.
rsync -a --delete --exclude ".env" "$REPO_DIR/backend/" "$APP_DIR/"

if [ ! -f "$APP_DIR/.env" ]; then
	echo "Missing $APP_DIR/.env. Aborting deploy."
	exit 1
fi

cd "$APP_DIR"
npm ci --omit=dev
mkdir -p "$APP_DIR/logs"

pm2 startOrReload ecosystem.config.js --only "$PM2_APP_NAME" --env production
pm2 save

if grep -qE '^PORT=' "$APP_DIR/.env"; then
	APP_PORT="$(grep -m1 -E '^PORT=' "$APP_DIR/.env" | cut -d '=' -f2 | tr -d '[:space:]')"
else
	APP_PORT="3000"
fi

curl --fail --silent --show-error "http://127.0.0.1:${APP_PORT}/api/v1/health" >/dev/null

sudo nginx -s reload

echo "=== Deployment Finished ==="