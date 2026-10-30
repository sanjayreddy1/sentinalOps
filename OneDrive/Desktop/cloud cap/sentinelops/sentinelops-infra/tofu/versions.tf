terraform {
  required_version = ">= 1.10.0"

  required_providers {
    oracle = {
      source  = "oracle/oci"
      version = "~> 5.20"
    }
  }
}

provider "oracle" {
  region = var.region
}
