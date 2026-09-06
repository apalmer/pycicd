#!/usr/bin/env bash
set -euo pipefail

echo "Starting Next.js application..."

npm install
npm run build
npm start