Getting Started
===============
Installation 
------------
Create Azure Resources
```bash
cd /pycicd/infra/project-baseline
terraform init
terraform plan -var-file='environments/dev1.tfvars' -out='dev1.tfplan'
terraform apply .\dev1.tfplan

cd /pycicd/infra/app-specific
terraform init
terraform plan -var-file='environments/dev1.tfvars' -out='dev1.tfplan'
terraform apply .\dev1.tfplan 
```
