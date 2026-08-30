#!/usr/bin/env bash
set -euo pipefail

echo "Starting Django application..."

APP_DIR="/home/site/wwwroot"
PYTHON_BIN="${PYTHON_BIN:-python3}"
VIRTUAL_ENV="antenv"

cd "$APP_DIR"

# Ensure uv is available on App Service images that do not include it.
if ! command -v uv >/dev/null 2>&1; then
	"$PYTHON_BIN" -m pip install --user uv
	export PATH="$HOME/.local/bin:$PATH"
fi


# Let uv decide whether to create a new environment or reuse an existing one.
# This avoids relying on any specific virtual environment directory name.
if [ -f uv.lock ]; then
	uv sync --frozen --no-dev
else
	uv sync --no-dev
fi

# Run Django database migrations
uv run python manage.py migrate --noinput

# Collect static files for production
uv run python manage.py collectstatic --noinput

# Start the Django ASGI application using Uvicorn.
exec uv run uvicorn --host="0.0.0.0" --port="${PORT:-8000}" --workers="${UVICORN_WORKERS:-4}" django_app.asgi:application
