#!/usr/bin/env bash

git reset --hard
git pull

npm i
npm build
pm2 restart byte-view

