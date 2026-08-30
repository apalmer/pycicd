#!/usr/bin/env bash
set -euo pipefail

echo "Starting Django application..."

APP_DIR="/home/site/wwwroot"
PYTHON_BIN="${PYTHON_BIN:-python3}"

cd "$APP_DIR"

# Ensure uv is available on App Service images that do not include it.
# if ! command -v uv >/dev/null 2>&1; then
# 	"$PYTHON_BIN" -m pip install --user uv
# 	export PATH="$HOME/.local/bin:$PATH"
# fi

# azure app service oryx installs uv dependencies
# if [ -f uv.lock ]; then
# 	uv sync --frozen --no-dev --active 
# else
# 	uv sync --no-dev --active 
# fi

# Run Django database migrations
python manage.py migrate --noinput --active 

# Collect static files for production
python manage.py collectstatic --noinput --active 

# Start the Django ASGI application using Uvicorn.
uvicorn --host="0.0.0.0" --port="${PORT:-8000}" --workers="${UVICORN_WORKERS:-4}" django_app.asgi:application
