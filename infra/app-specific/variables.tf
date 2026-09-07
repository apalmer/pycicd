variable "project_name" {
  description = "The name of the project"
  type        = string
}

variable "project_instance" {
  description = "The instance of the project"
  type        = string
}

variable "location" {
  description = "The location of the project"
  type        = string
}

variable "resource_group_name" {
  description = "The name of the resource group"
  type        = string
}

variable "pe_subnet_id" {
  description = "The ID of the subnet"
  type        = string
}

variable "vnet_integration_subnet_id" {
  description = "The ID of the subnet for the app service"
  type        = string
}

variable "django_secret_key" {
  description = "The secret key for the Django application"
  type        = string
}

variable "django_api_base_url" {
  description = "Required Django API base URL used by the Next app."
  type        = string
}