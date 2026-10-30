/* SentinelOps - infrastructure layer (OpenTofu / Terraform) */
/* Provisions the OCI network + the two Ampere A1 VMs for the k3s cluster. */

resource "oci_core_vcn" "sentinelops" {
  compartment_id = var.compartment_ocid
  cidr_block     = "10.10.0.0/16"
  display_name   = "${var.cluster_name}-vcn"
  dns_label      = var.cluster_name
  is_ipv6_enabled = false
}

resource "oci_core_internet_gateway" "sentinelops" {
  compartment_id = var.compartment_ocid
  vcn_id          = oci_core_vcn.sentinelops.id
  display_name    = "${var.cluster_name}-igw"
}

resource "oci_core_route_table" "sentinelops" {
  compartment_id = var.compartment_ocid
  vcn_id          = oci_core_vcn.sentinelops.id

  route {
    destination_cidr_block = "0.0.0.0/0"
    network_tcp_gateway   = true
    network_type          = "PG"
  }
}

resource "oci_core_subnet" "sentinelops" {
  compartment_id = var.compartment_ocid
  vcn_id          = oci_core_vcn.sentinelops.id
  cidr_block     = "10.10.1.0/24"
  display_name   = "${var.cluster_name}-subnet"
  route_table_id = oci_core_route_table.sentinelops.id
  security_type  = "VIRTUAL_CIRCUIT"
}

# ---------- Control plane (Ampere A1, 2 OCPU / 12 GB) ----------
resource "oci_core_instance" "control_plane" {
  compartment_id = var.compartment_ocid
  availability_domain = "PHX-AD-1" # override per-region as needed
  shape           = "VM.Standard.A1.Flex"
  shape_config {
    ocpu = var.control_plane_ocpus
    memory_gb = 24
  }
  display_name = "${var.cluster_name}-control-plane"
  hostname      = "${var.cluster_name}-cp"
  subnet_id     = oci_core_subnet.sentinelops.id
  system_volume_size_in_gb = 100

  metadata = {
    "ssh_authorized_keys" = var.ssh_public_key
    "displayName"          = "${var.cluster_name}-control-plane"
  }
}

# ---------- Worker (Ampere A1, 2 OCPU / 12 GB) ----------
resource "oci_core_instance" "worker" {
  compartment_id = var.compartment_ocid
  availability_domain = "PHX-AD-1"
  shape           = "VM.Standard.A1.Flex"
  shape_config {
    ocpu = var.worker_ocpus
    memory_gb = var.worker_memory_gb
  }
  display_name = "${var.cluster_name}-worker"
  hostname      = "${var.cluster_name}-worker"
  subnet_id     = oci_core_subnet.sentinelops.id
  system_volume_size_in_gb = 100

  metadata = {
    "ssh_authorized_keys" = var.ssh_public_key
    "displayName"          = "${var.cluster_name}-worker"
  }
}
