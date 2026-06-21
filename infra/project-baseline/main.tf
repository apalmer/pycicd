locals {
  tags = {
    project     = var.project_name
    instance = var.project_instance
    location    = var.location
  }
}

resource "azurerm_resource_group" "main" {
  name     = "rg-${var.project_name}-${var.project_instance}"
  location = var.location

  tags = local.tags
}