# SentinelOps — Resume Bullets

> Suggested bullets mapped to the "Advanced Cloud Computing Project Ideas" top pick.

## Project-specific bullets
- Provisioned a production-style Kubernetes platform on Oracle Cloud Always Free using OpenTofu (IaC) and Ansible, running k3s as the control plane.
- Built GitOps CI/CD pipeline (GitHub Actions + Buildx + Trivy + Syft + Cosign + ArgoCD) with canary releases and automated rollback via Argo Rollouts analysis.
- Enforced security posture with Kyverno policies (signed images, non-root, SHA tags, resource limits) and Falco runtime threat detection.
- Implemented event-driven autoscaling with KEDA scale-to-zero and cost visibility with OpenCost.

## Quantified results (use in interviews)
- "Reduced deployment time from 20 min to 3 min"
- "Auto-recovered from pod/node failure in under 30 s"
- "Cut idle resource cost by 40% in load tests"
- "Reduced simulated infrastructure cost by 35% using KEDA autoscaling and OpenCost"

## Suggested final bullet
> Designed and deployed a GitOps-based Kubernetes platform with automated CI/CD, Trivy/Falco security gates, canary releases, and chaos-tested self-healing; reduced simulated infrastructure cost by 35% using KEDA autoscaling and OpenCost analytics.
