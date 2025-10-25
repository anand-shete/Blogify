#!/bin/bash


export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

echo "=== Deployment Started ==="

# Preserve .env file
cd ~
mv ~/blogify/.env ~
rm -r ~/blogify


# Clone the repository
git clone https://github.com/anand-shete/Blogify
mv ~/Blogify/backend ~/blogify


# Install dependencies
cd blogify
npm ci --omit=dev
mv ~/.env .


# Cleanup step
rm -rf ~/Blogify ~/deploy.sh
pm2 delete blogify || true



# Start new processes
cd blogify
pm2 start npm --name "blogify" -- start
sudo nginx -s reload

echo "=== Deployment Finished 🎉 ==="