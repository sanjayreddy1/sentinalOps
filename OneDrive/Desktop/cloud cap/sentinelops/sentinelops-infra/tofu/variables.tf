variable "region" {
  description = "OCI region to deploy into (Always Free eligible: us-ashburn-1, us-ashram... )"
  type        = string
  default     = "us-ashburn-1"
}

variable "tenancy_ocid" {
  description = "OCID of the OCI tenancy"
  type        = string
}

variable "compartment_ocid" {
  description = "OCID of the compartment to deploy into"
  type        = string
}

variable "cluster_name" {
  description = "Logical name of the SentinelOps cluster"
  type        = string
  default     = "sentinelops"
}

variable "ssh_public_key" {
  description = "Public SSH key (OpenSSH format) installed on the Ubuntu VMs"
  type        = string
}

variable "control_plane_ocpus" {
  description = "OCPU count for the control-plane Ampere A1 VM"
  type        = number
  default     = 2
}

variable "worker_ocpus" {
  description = "OCPU count for the worker Ampere A1 VM"
  type        = number
  default     = 2
}

variable "worker_memory_gb" {
  description = "RAM (GB) for the worker VM - A1 shapes cap at 24GB total per instance"
  type        = number
  default     = 12
}
