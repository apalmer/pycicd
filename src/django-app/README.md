# Django Application

Application Insights is configured automatically when
`APPLICATIONINSIGHTS_CONNECTION_STRING` is set. The App Service Terraform
configuration supplies this setting and sets `OTEL_SERVICE_NAME` so requests,
dependencies, exceptions, and application logs are grouped under the Django
service name. Health checks use `/healthz/` and are excluded from request
telemetry.

For local telemetry, add the connection string to `src/django-app/.env`:

```dotenv
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=...;IngestionEndpoint=https://...
OTEL_SERVICE_NAME=django-local
```
