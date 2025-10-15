#!/bin/bash

# Store earlier .env
mv ~/blogify/.env ~
rm -r ~/blogify

cd ~
git clone https://github.com/anand-shete/Blogify
mv ~/Blogify/backend ~/blogify
cd blogify
npm install

# Move .env to correct place
mv ~/.env .


# Reload PM2 and Nginx
pm2 reload blogify
sudo nginx -s reload