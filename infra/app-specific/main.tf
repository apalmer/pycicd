locals {
  tags = {
    project  = var.project_name
    instance = var.project_instance
    location = var.location
  }
}

resource "azurerm_service_plan" "main" {
  name                = "linux-plan-${var.project_name}-${var.project_instance}"
  resource_group_name = var.resource_group_name
  location            = var.location
  os_type             = "Linux"
  sku_name            = "B1"

  tags = local.tags
}


resource "azurerm_linux_web_app" "app_service_django" {
  name                      = "site-django-${var.project_name}-${var.project_instance}"
  location                  = var.location
  resource_group_name       = var.resource_group_name
  service_plan_id           = azurerm_service_plan.main.id
  virtual_network_subnet_id = var.vnet_integration_subnet_id

  site_config {
    health_check_path = "/healthz"
    health_check_eviction_time_in_min = 10
    app_command_line = "bash startup.sh"

    application_stack {
      python_version = "3.14"
    }
  }



  app_settings = {
    APPLICATIONINSIGHTS_CONNECTION_STRING      = azurerm_application_insights.main.connection_string
    APPLICATIONINSIGHTS_LIVE_METRICS_ENABLE    = "false"
    APPLICATIONINSIGHTS_STATSBEAT_DISABLED_ALL = "true"
    OTEL_SERVICE_NAME                          = "django-${var.project_name}-${var.project_instance}"
    OTEL_PYTHON_DJANGO_EXCLUDED_URLS           = "healthz"
    SCM_DO_BUILD_DURING_DEPLOYMENT             = "1"
    SECRET_KEY                                 = var.django_secret_key
  }

  tags = local.tags
}

resource "azurerm_private_endpoint" "app_service_django_private_endpoint" {
  name                = "pe-django-${var.project_name}-${var.project_instance}"
  location            = var.location
  resource_group_name = var.resource_group_name
  subnet_id           = var.pe_subnet_id

  private_service_connection {
    name                           = "psc-django-${var.project_name}-${var.project_instance}"
    private_connection_resource_id = azurerm_linux_web_app.app_service_django.id
    is_manual_connection           = false
    subresource_names              = ["sites"]
  }

  tags = local.tags
}

resource "azurerm_linux_web_app" "app_service_next" {
  name                      = "site-next-${var.project_name}-${var.project_instance}"
  location                  = var.location
  resource_group_name       = var.resource_group_name
  service_plan_id           = azurerm_service_plan.main.id
  virtual_network_subnet_id = var.vnet_integration_subnet_id

  site_config {
    health_check_path = "/healthz/"
    health_check_eviction_time_in_min = 10

    application_stack {
      node_version = "24"
    }
  }

  app_settings = {
    APPLICATIONINSIGHTS_CONNECTION_STRING = azurerm_application_insights.main.connection_string
    OTEL_SERVICE_NAME                     = "next-${var.project_name}-${var.project_instance}"
    OTEL_PYTHON_DJANGO_EXCLUDED_URLS      = "healthz"
  }

  tags = local.tags
}

resource "azurerm_private_endpoint" "app_service_next_private_endpoint" {
  name                = "pe-next-${var.project_name}-${var.project_instance}"
  location            = var.location
  resource_group_name = var.resource_group_name
  subnet_id           = var.pe_subnet_id

  private_service_connection {
    name                           = "psc-next-${var.project_name}-${var.project_instance}"
    private_connection_resource_id = azurerm_linux_web_app.app_service_next.id
    is_manual_connection           = false
    subresource_names              = ["sites"]
  }

  tags = local.tags
}

resource "azurerm_log_analytics_workspace" "main" {
  name                = "law-${var.project_name}-${var.project_instance}"
  location            = var.location
  resource_group_name = var.resource_group_name
  sku                 = "PerGB2018" # Default standard pay-as-you-go tier
  retention_in_days   = 30          # Customizable from 30 to 730 days
}

resource "azurerm_application_insights" "main" {
  name                = "appi-${var.project_name}-${var.project_instance}"
  location            = var.location
  resource_group_name = var.resource_group_name
  workspace_id        = azurerm_log_analytics_workspace.main.id # Ties to Log Analytics
  application_type    = "web"                                   # Options: ios, java, mobile, phone, store, web
}
