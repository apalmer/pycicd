locals {
  tags = {
    project     = var.project_name
    instance = var.project_instance
    location    = var.location
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


resource "azurerm_linux_web_app" "app_service" {
  name                = "site-django-${var.project_name}-${var.project_instance}"
  location            = var.location
  resource_group_name = var.resource_group_name
  service_plan_id = azurerm_service_plan.main.id
  virtual_network_subnet_id = var.vnet_integration_subnet_id

  site_config {
  }

  tags = local.tags
}

resource "azurerm_private_endpoint" "app_service_private_endpoint" {
  name                = "pe-django-${var.project_name}-${var.project_instance}"
  location            = var.location
  resource_group_name = var.resource_group_name
  subnet_id           = var.pe_subnet_id

  private_service_connection {
    name                           = "psc-django-${var.project_name}-${var.project_instance}"
    private_connection_resource_id = azurerm_linux_web_app.app_service.id
    is_manual_connection          = false
    subresource_names             = ["sites"]
  }

  tags = local.tags
}