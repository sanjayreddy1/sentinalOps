output "control_plane_public_ip" {
  value = oci_core_instance.control_plane.public_ip
}

output "worker_public_ip" {
  value = oci_core_instance.worker.public_ip
}

output "kubeconfig_hint" {
  value = "scp the kubeconfig produced by the Ansible k3s playbook to ~/.kube/config and run: kubectl --kubeconfig ~/.kube/sentinelops.conf get nodes"
}
