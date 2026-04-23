#!/usr/bin/env bash

set -euo pipefail

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

APP_DIR="$HOME/blogify"


echo "=== Deployment Started ==="

if [[ ! -d "$APP_DIR" ]]; then
	echo "App directory not found: $APP_DIR"
	exit 1
fi

cd "$APP_DIR"

if [[ ! -f "package.json" ]]; then
	echo "package.json not found in $APP_DIR"
	exit 1
fi

# change to `src/server.js` if not using typescript, 
if [[ ! -f "src/server.js" ]]; then
	echo "Build artifact missing: src/server.js"
	exit 1
fi

npm ci --omit=dev

pm2 startOrReload ecosystem.config.js --only "$PM2_APP_NAME" --env production
pm2 save

sudo nginx -s reload

echo "=== Deployment Finished ==="