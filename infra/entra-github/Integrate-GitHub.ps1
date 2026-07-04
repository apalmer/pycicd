$subscriptionId = "9247ed7a-b968-41cf-9104-9177a53aefd6"
$resourceGroupName = "rg-pycidcd-dev1" 
$appName = "site-django-pycidcd-dev1"
$app_name = "pycicd-dev1"

# perhaps we want to retrieve the app object id and service principal object id instead of creating a new one
# $app_object_id = "d1689c39-3335-49f0-bdc2-56776101a569"
# $service_principal_object_id = "0b2c83cb-e7d2-4d6f-a315-c5f51da70e06"

$app = az ad app create --display-name $app_name | ConvertFrom-Json

# perhaps we can use the app id to get the app details instead of creating a new one
#$app = az ad app show --id $app_object_id | ConvertFrom-Json

$service_principal = az ad sp create --id $app.appId | ConvertFrom-Json

# perhaps we can use the service principal object id to get the service principal details instead of creating a new one
#$service_principal = az ad sp show --id $service_principal_object_id | ConvertFrom-Json

$app_scope = "/subscriptions/$subscriptionId/resourceGroups/$resourceGroupName/providers/Microsoft.Web/sites/$appName"
$role_assignment = az role assignment create --role "Website Contributor" --subscription $subscriptionId --assignee-object-id  $service_principal.id --scope $app_scope --assignee-principal-type ServicePrincipal

$credential = az ad app federated-credential create --id $app.appId --parameters credential.json

$credential
