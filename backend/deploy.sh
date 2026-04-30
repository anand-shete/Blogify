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

# change to `src/server.js` if not using typescript, 
# check rootDir and outDir in tsconfig.json
if [[ ! -f "src/server.js" ]]; then
	echo "Build artifact missing: src/server.js"
	exit 1
fi

pm2 reload blogify --update-env || pm2 start src/server.js --name blogify
pm2 save

echo "=== Deployment Finished ==="