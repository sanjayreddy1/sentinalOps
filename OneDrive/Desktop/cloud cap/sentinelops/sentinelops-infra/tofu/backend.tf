terraform {
  backend "local" {
    path = "terraform/state/sentinelops.tfstate"
  }
}

# NOTE: For team/shared environments switch to the OCI Object Storage S3-compatible
# backend:
# terraform {
#   backend "s3" {
#     endpoint = "https://namespace.compat.objectstorage.oraclecloud.com"
#     ...
#   }
# }
