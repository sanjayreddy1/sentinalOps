# SentinelOps

**Ship fast. Stay secure. Self-heal.** SentinelOps is a self-healing, cost-aware, secure Kubernetes platform. A developer pushes code to Git; the platform builds it, scans it, signs it, deploys it as a canary, watches it, rolls it back if it misbehaves, scales it, recovers it from failures, and reports what it costs. A custom web console ties it together.

> **Status:** Planning. The stack matches the parent blueprint (Advanced Cloud Computing Project Ideas, Part 2). Only hosting changed: **no credit card and nothing local**. Versions are mid-2026 known-good picks; check release pages and pin the latest stable patch before starting.

---

## 1. Problems Solved

| Real-world problem | What SentinelOps does | Target result |
|---|---|---|
| Slow, manual deployments | GitOps and automated CI/CD | Commit to production under 5 min |
| Vulnerable code reaches production | Trivy, Kyverno, image signing, SBOM | 100% of insecure test deployments blocked |
| Bad releases cause outages | Canary releases with automatic rollback | Rollback under 60 s |
| Failures need a human at 3 a.m. | Self-healing, alert-driven remediation | Recovery under 30 s |
| Idle workloads waste money | KEDA scale-to-zero, right-sizing, OpenCost | Cost reduction of 30%+ |

---

## 2. Architecture

```
Developer -> git push -> GitHub Actions (lint, test, build, Trivy, Syft, Cosign, GHCR)
                              |
                              v  bump image tag
                     GitOps repo <---- ArgoCD syncs
                              |
                              v
+------ Kubernetes (k3s on Azure VMs, or k3s in Codespaces) ------+
| Kyverno: signed images, non-root, limits required              |
| Argo Rollouts + Istio: canary 10/30/60/100 with Prometheus gate|
| App: frontend, api-gateway, catalog, orders, payments          |
| KEDA + HPA | Falco | OpenBao + External Secrets                |
| Prometheus -> Alertmanager -> remediation webhook              |
| Loki, Grafana, OpenTelemetry, Tempo | OpenCost | Chaos Mesh    |
+----------------------------------------------------------------+
                              |
                              v
        SentinelOps Console (React + FastAPI + Keycloak)
```

---

## 3. Tech Stack

| Area | Tools and versions |
|---|---|
| Infrastructure | Ubuntu Server 24.04 LTS, OpenTofu 1.10.x, Ansible core 2.18.x, k3s v1.33.x, Helm 3.18.x, Kustomize 5.6.x |
| CI/CD and GitOps | GitHub Actions, Docker Buildx 0.24.x, GHCR, ArgoCD 3.0.x or later 3.x, Argo Rollouts 1.8.x, Argo Image Updater 0.16.x (optional) |
| Security | Trivy 0.6x.x, Trivy Operator 0.2x.x, Syft 1.x, Cosign 2.5.x, Kyverno 1.14.x, Falco 0.41.x, OpenBao 2.x, External Secrets Operator 0.18.x, cert-manager 1.18.x, Gitleaks 8.2x.x |
| Observability | kube-prometheus-stack 7x.x (Prometheus 3.x, Alertmanager 0.28.x), Grafana 12.x, Loki and Promtail or Alloy 3.5.x, Tempo 2.8.x, OpenTelemetry Collector 0.12x.x |
| Scaling, cost, chaos, mesh | KEDA 2.17.x, metrics-server 0.7.x, Goldilocks 4.x and VPA 1.4.x, OpenCost 1.11x.x, Chaos Mesh 2.7.x, k6 1.x, Istio 1.26.x |
| Demo app | Go 1.24, Python 3.12 and FastAPI 0.115, React 19, Vite 6, TypeScript 5.8, PostgreSQL 17 with CloudNativePG 1.26, Valkey 8 |
| Console | React 19, Vite 6, TypeScript 5.8, Tailwind CSS 4, shadcn/ui, Recharts 2.15, TanStack Query 5; FastAPI 0.115, httpx, Pydantic 2.11, kubernetes client 33; Keycloak 26 |
| Testing | pytest, Go test, Playwright 1.5x, k6 |

---

## 4. Free, No-Card, Cloud-Only Hosting

| Track | Who | What you get |
|---|---|---|
| **A. Azure for Students** | Verified university students | $100 credit for 12 months, renewable yearly; no credit card; two Arm VMs (control plane and worker) provisioned by OpenTofu and configured by Ansible |
| **B. GitHub Codespaces** | Anyone with a GitHub account | 120 core-hours and 15 GB storage per month on the free plan; no card (usage is blocked, not billed, when the quota ends); k3s runs inside Docker using k3d |

Run `make down` after each session on Track A to deallocate VMs and save credit. Re-check both offers' current terms before you start.

---

## 5. Repositories

```
sentinelops-app/       services/ (api-gateway, catalog, orders, payments, frontend), CI
sentinelops-gitops/    apps/, platform/, workloads/, policies/, rollouts/, chaos/
sentinelops-infra/     tofu/ (Azure VNet, NSG, VMs), ansible/, Makefile
sentinelops-console/   frontend/ (React), backend/ (FastAPI)
```

---

## 6. Quick Start (Track A)

```bash
git clone https://github.com/<you>/sentinelops-infra.git && cd sentinelops-infra
az login                    # student subscription, no card
make up                     # OpenTofu creates network + VMs, Ansible installs k3s
helm install argocd ...     # bootstrap ArgoCD once
kubectl apply -f root-app.yaml   # app-of-apps installs everything else
make demo                   # runs the 3-minute demo scenarios
make down                   # deallocate VMs to save credit
```

---

## 7. Console Screens

Login, Platform Overview, Deployments and Releases, Security Center, Incidents and Self-Healing, Cost and Capacity, Chaos Lab, Audit Log. Styling lives in `global.css` (Tailwind 4 theme, shadcn/ui tokens, buttons, gradients, dark mode).

---

## 8. Success Metrics

| Metric | Target |
|---|---|
| Commit to running in prod | under 5 min |
| Insecure deployments blocked | 100% |
| Automatic rollback time | under 60 s |
| Pod failure recovery | under 30 s, error rate under 1% |
| Cost reduction (autoscaling on vs fixed) | 30% or better |
| Availability under chaos | 99.5% or better |

---

## 9. Roadmap (10 weeks)

| Weeks | Focus |
|---|---|
| 1-2 | Repos, OpenTofu and Ansible, k3s, ArgoCD, demo microservices |
| 3-4 | CI with Trivy, Syft, Cosign; Kyverno, OpenBao, Istio mTLS |
| 5-6 | Observability stack; canary releases; HPA and KEDA |
| 7-8 | Remediation webhook, Falco, Chaos Mesh, OpenCost, load tests |
| 9-10 | Console and Keycloak, docs, demo video, blog post |

---

## 10. License

Proposed: Apache-2.0. All platform components are open source.
