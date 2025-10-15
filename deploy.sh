#!/bin/bash


# Store earlier .env
mv ~/blogify/.env ~
rm -r ~/blogify

cd ~
git clone https://github.com/anand-shete/Blogify
mv ~/Blogify/backend ~/blogify
cd blogify
npm install

# Move .env file to correct location
mv ~/.env .


# Delete unused directories and processes
rm -rf ~/Blogify
pm2 delete blogify


# Start new processes
pm2 start npm --name "blogify" -- start
sudo nginx -s reload