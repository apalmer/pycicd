Getting Started
===============

Prerequisites
-------------

- Azure subscription access with permissions to create resource groups, networking, App Service, and role assignments.
- Azure CLI installed and authenticated (`az login`).
- Terraform CLI `>= 1.15.0`.
- Python `3.14+` and `uv` for the Django app.
- Node.js `24.x` and `pnpm` for the Next.js app.

Create Azure Resources
----------------------

1) Provision baseline infrastructure

```bash
cd infra/project-baseline
terraform init -backend-config="environments/dev1.tfbackend"
terraform plan -var-file="environments/dev1.tfvars" -out="dev1.tfplan"
terraform apply "dev1.tfplan"
```

2) Provision app-specific infrastructure

The app-specific Terraform requires a Django secret key.

PowerShell:

```powershell
$env:TF_VAR_django_secret_key = "replace-with-a-strong-secret"
```

Bash:

```bash
export TF_VAR_django_secret_key="replace-with-a-strong-secret"
```

Then run:

```bash
cd infra/app-specific
terraform init -backend-config="environments/dev1.tfbackend"
terraform plan -var-file="environments/dev1.tfvars" -out="dev1.tfplan"
terraform apply "dev1.tfplan"
```

Optional: Configure GitHub OIDC Deployment
------------------------------------------

1) Review and update tenant/subscription/app names and repository subject in:

- `infra/entra-github/Integrate-GitHub.ps1`
- `infra/entra-github/credential.json`

2) Run the setup script:

```powershell
cd infra/entra-github
./Integrate-GitHub.ps1
```

3) Add these GitHub repository secrets:

- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`

These are used by:

- `.github/workflows/django-azure-app-service-deploy.yml`
- `.github/workflows/next-azure-app-service-deploy.yml`

Run Locally
-----------

Django app

```bash
cd src/django-app
uv sync --dev
```

Create `src/django-app/.env`:

```dotenv
SECRET_KEY=replace-with-a-local-secret
APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=...;IngestionEndpoint=https://...
OTEL_SERVICE_NAME=django-local
```

Start Django:

```bash
python manage.py migrate
python manage.py runserver
```

Next.js app

```bash
cd src/next-app
pnpm install
cp .env.example .env.local
pnpm dev
```

Default local URLs:

- Django: `http://localhost:8000`
- Next.js: `http://localhost:3000`
