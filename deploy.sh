#!/bin/bash
git pull origin main
cd ./backend
npm install
pm2 reload blogify