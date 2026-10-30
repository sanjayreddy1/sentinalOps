# SentinelOps — Pinned Tool Versions (mid-2026 known-good set)

> Before starting, check each project's release page and pin to the latest stable
> patch of the same major/minor line. Pin everything (Helm chart versions, image tags,
> GitHub Action SHAs); unpinned versions are the number one reason these projects break.

## Infrastructure and cluster

| Component | Version | Purpose |
| --- | --- | --- |
| Ubuntu Server | 24.04 LTS | Node OS |
| OpenTofu | 1.10.x | Infrastructure as Code (Oracle Cloud VMs, network) |
| Ansible | core 2.18.x | Node configuration, k3s install |
| k3s | v1.33.x (Kubernetes 1.33) | Lightweight production-grade Kubernetes |
| kind | 0.29.x | Local dev cluster for quick testing |
| Helm | 3.18.x | Package manager |
| Kustomize | 5.6.x | Environment overlays |
| Oracle Cloud Always Free | 4 ARM OCPU, 24 GB RAM total | Real cloud hosting |

## CI/CD and GitOps

| Component | Version | Purpose |
| --- | --- | --- |
| GitHub Actions | hosted runners (free for public repos) | CI pipeline |
| Docker Buildx | 0.24.x | Multi-arch image builds (amd64 + arm64) |
| ArgoCD | 3.0.x or later 3.x | GitOps continuous delivery |
| Argo Rollouts | 1.8.x | Canary and blue-green releases |

## Security

| Component | Version | Purpose |
| --- | --- | --- |
| Trivy | 0.6x.x | Image, IaC and dependency scanning in CI |
| Trivy Operator | 0.2x.x | Continuous in-cluster vulnerability reports |
| Syft | 1.x | SBOM generation |
| Cosign (Sigstore) | 2.5.x | Keyless image signing and verification |
| Kyverno | 1.14.x | Admission policies (verify signatures, block root, require limits) |
| Falco | 0.41.x | Runtime threat detection (eBPF driver) |
| OpenBao | 2.x | Secrets management (open-source Vault fork) |
| External Secrets Operator | 0.18.x | Syncs OpenBao secrets into Kubernetes |
| cert-manager | 1.18.x | Automatic TLS certificates |
| Gitleaks | 8.2x.x | Secret scanning in CI |

## Observability, scaling, cost, chaos

| Component | Version | Purpose |
| --- | --- | --- |
| kube-prometheus-stack (Helm chart) | 7x.x (ships Prometheus 3.x, Alertmanager 0.28.x) | Metrics and alerting |
| Grafana | 12.x | Dashboards |
| Loki + Promtail (or Grafana Alloy) | 3.5.x | Log aggregation |
| Tempo | 2.8.x | Distributed tracing |
| OpenTelemetry Collector | 0.12x.x | Telemetry pipeline |
| KEDA | 2.17.x | Event-driven autoscaling, scale-to-zero |
| metrics-server | 0.7.x | Resource metrics for HPA |
| Goldilocks + VPA (recommend mode) | 4.x / 1.4.x | Right-sizing recommendations |
| OpenCost | 1.11x.x | Per-namespace and per-workload cost |
| Chaos Mesh | 2.7.x | Pod kill, network delay, CPU stress experiments |
| k6 | 1.x | Load testing |
| Istio | 1.26.x (ambient or sidecar mode) | mTLS, traffic splitting, retries |
