terraform {
  # Minimum version of the Terraform CLI required
  required_version = ">= 1.15.0"

  # Configuration for external provider binaries
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.78" # Locks to major version 4, allows minor updates
    }
  }

  backend "azurerm" {}
}

# Configures the active AzureRM provider features block
provider "azurerm" {
  features {} 
}