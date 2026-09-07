#!/usr/bin/env bash
set -euo pipefail

echo "Starting Next.js standalone application..."

if [ ! -f ".next/standalone/server.js" ]; then
	echo "Standalone build not found at .next/standalone/server.js"
	echo "Run 'npm run build' first to generate the standalone output."
	exit 1
fi

export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export PORT="${PORT:-8000}"

exec node .next/standalone/server.js