#!/usr/bin/env bash
set -euo pipefail

echo "Starting Next.js application..."

npm run build
npm start