"""
WSGI config for django_app project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from azure.monitor.opentelemetry import configure_azure_monitor
from opentelemetry.instrumentation.django import DjangoInstrumentor

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_app.settings')

# -------------------------------------------------
print("Initializing Azure Application Insights...", os.getenv("APPLICATIONINSIGHTS_CONNECTION_STRING", "No connection string found in environment variables."))
# Configures OpenTelemetry to automatically use the connection string from env
configure_azure_monitor(
    instrumentations={"django": {"enabled": True}}
) 

# Hooks OpenTelemetry into Django's request/response loop
DjangoInstrumentor().instrument()
print("Azure Application Insights initialized successfully.")
# -------------------------------------------------


application = get_wsgi_application()
