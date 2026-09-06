#!/usr/bin/env bash
set -euo pipefail

echo "Starting Next.js application..."

pnpm run build
pnpm start