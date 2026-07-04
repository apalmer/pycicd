#!/usr/bin/env bash
set -e

# Install or sync dependencies using uv
# Note: uv will automatically create or use the .venv in the project root
uv sync --frozen --no-dev

# Run Django database migrations
uv run python manage.py migrate --noinput

# Collect static files for production
uv run python manage.py collectstatic --noinput

# Start the Django application using Gunicorn
# Replace 'myproject.wsgi' with your actual Django WSGI module path
exec uv run gunicorn --bind=0.0.0.0:8000 --workers=4 django_app.wsgi
