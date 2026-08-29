"""
ASGI config for django_app project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/asgi/
"""

import os
from pathlib import Path

from azure.monitor.opentelemetry import configure_azure_monitor
from django.core.asgi import get_asgi_application
from dotenv import load_dotenv

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_app.settings')
load_dotenv(Path(__file__).resolve().parent.parent / '.env')

connection_string = os.getenv('APPLICATIONINSIGHTS_CONNECTION_STRING')
print('Initializing Azure Application Insights...')

if connection_string:
    configure_azure_monitor()
    print('Azure Application Insights initialized successfully.')
else:
    print('Azure Application Insights skipped: APPLICATIONINSIGHTS_CONNECTION_STRING is not configured.')

application = get_asgi_application()
