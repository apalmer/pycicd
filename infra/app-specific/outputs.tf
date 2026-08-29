output "application_insights_connection_string" {
	description = "Application Insights connection string configured on the Django App Service."
	value       = azurerm_application_insights.main.connection_string
	sensitive   = true
}

output "application_insights_name" {
	description = "Name of the Application Insights resource receiving Django telemetry."
	value       = azurerm_application_insights.main.name
}
