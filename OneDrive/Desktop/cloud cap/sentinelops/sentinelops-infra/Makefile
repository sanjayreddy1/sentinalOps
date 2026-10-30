.PHONY: help up down status demo clean

INFRA_DIR := .
ANSIBLE_DIR := ansible

help:
	@echo "SentinelOps infra targets"

up:
	terraform -chdir=./tofu init
	terraform -chdir=./tofu apply -auto-approve
	ansible-playbook -i ./ansible/inventory/hosts.yml ./ansible/playbooks/site.yml

down:
	ansible-playbook -i ./ansible/inventory/hosts.yml ./ansible/playbooks/site.yml --tags destroy
	terraform -chdir=./tofu destroy -auto-approve

status:
	terraform -chdir=./tofu output

demo:
	@echo "Full local demo: k3s via kind + ArgoCD in docker compose (see sentinelops-gitops)"
