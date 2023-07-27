#!/usr/bin/env bash

npm i
npm run build
pm2 delete byte-view
pm2 start index.js -i max --name byte-view
pm2 save
