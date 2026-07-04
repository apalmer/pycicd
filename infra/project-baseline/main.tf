locals {
  tags = {
    project  = var.project_name
    instance = var.project_instance
    location = var.location
  }
}

resource "azurerm_resource_group" "main" {
  name     = "rg-${var.project_name}-${var.project_instance}"
  location = var.location

  tags = local.tags
}

resource "azurerm_virtual_network" "main" {
  name                = "vnet-${var.project_name}-${var.project_instance}"
  location            = var.location
  resource_group_name = azurerm_resource_group.main.name

  address_space = ["10.0.0.0/16"]

  tags = local.tags
}

resource "azurerm_network_security_group" "main" {
  name                = "nsg-${var.project_name}-${var.project_instance}"
  location            = var.location
  resource_group_name = azurerm_resource_group.main.name

  security_rule {
    name                       = "AllowSSH"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  tags = local.tags
}

resource "azurerm_subnet" "pe" {
  name                 = "subnet-${var.project_name}-pe-${var.project_instance}"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name

  address_prefixes = ["10.0.0.0/27"]
}

resource "azurerm_subnet_network_security_group_association" "pe" {
  subnet_id                 = azurerm_subnet.pe.id
  network_security_group_id = azurerm_network_security_group.main.id
}

resource "azurerm_subnet" "vi" {
  name                 = "subnet-${var.project_name}-vi-${var.project_instance}"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name

  delegation {
    name = "app-service-delegation"

    service_delegation {
      name    = "Microsoft.Web/serverFarms"
      actions = ["Microsoft.Network/virtualNetworks/subnets/action"]
    }
  }

  address_prefixes = ["10.0.0.32/27"]
}

resource "azurerm_subnet_network_security_group_association" "vi" {
  subnet_id                 = azurerm_subnet.vi.id
  network_security_group_id = azurerm_network_security_group.main.id
}
