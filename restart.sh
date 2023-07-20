#!/usr/bin/env bash

git pull

npm i
npm build
pm2 restart byte-view

