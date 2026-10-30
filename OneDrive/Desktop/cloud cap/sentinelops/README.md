# SentinelOps — Self-Healing, Cost-Aware, Secure Kubernetes Platform

Greenfield implementation of the **SentinelOps** blueprint from
`Advanced Cloud Computing Project Ideas (Free and Open Source).md` (Part 2).

## Repository layout

```
sentinelops/
  sentinelops-infra/    # OpenTofu + Ansible + k3s cluster (Week 1)
  sentinelops-app/       # Demo e-commerce microservices + CI (Weeks 1-3)
  sentinelops-gitops/   # ArgoCD, canary, policies, chaos, workloads (Weeks 2-7)
  sentinelops-console/  # Custom web console: FastAPI backend + React frontend (Weeks 9-10)
```

## Blueprint mapping

| Blueprint section | Repo | Status |
| --- | --- | --- |
| 1. Problem / goals | cross-repo | done (docs) |
| 2. Architecture | all | scaffolded |
| 3. Tech stack + versions | all | versions pinned in sentinelops-infra/VERSIONS.md |
| 4. Repo structure | all | scaffolded |
| 5. Implementation details | infra/app/gitops/console | in progress / scaffolded |
| 6. Console screens | sentinelops-console | done (Screens 1-8 built, styled via `build-docs/global(1).css`) |
| 7. Week-by-week plan | cross-repo | planned |
| 8. Testing + metrics | console/frontend | in progress (Vitest green) |
| 9. Demo script | - | pending |
| 10. Risks | cross-repo | documented |

## Completed in this session

- [x] OpenTofu infrastructure (VCN, subnet, IGW, RT, 2× Ampere A1 VMs)
- [x] Ansible k3s bootstrap + node hardening playbooks
- [x] Makefile (`up` / `down` / `demo`)
- [x] Demo microservice skeletons (Go gateway/orders/payments, FastAPI catalog, React frontend) + Dockerfiles
- [x] GitHub Actions CI: test → gitleaks → buildx → Trivy → Syft → Cosign → promote
- [x] ArgoCD app-of-apps root + platform components (ArgoCD, Kyverno, Falco, KEDA, Istio, Monitoring, Keycloak)
- [x] Kustomize base + dev/staging/prod overlays
- [x] Kyverno ClusterPolicies (verifyImages, limits, non-root, SHA tags, default-deny)
- [x] Argo Rollouts canary + AnalysisTemplate
- [x] Chaos Mesh experiments
- [x] Console backend (FastAPI) with all 8 API groups + remediation webhook + audit + `/webhook` endpoint
- [x] Alertmanager webhook receiver config + PrometheusRule alert sets
- [x] Console frontend screens 1-8 wired
- [x] Final artifacts authored: DEMO_SCRIPT.md, RESUME_BULLETS.md, load/k6-traffic.js + K6_RUNBOOK.md
- [x] Fullstack rebuild: console frontend (React 19 + Vite 6 + Tailwind 4 design system from `build-docs/global(1).css`), demo shop frontend, CORS + API proxy wiring
- [x] `npm run build` passes for console frontend and demo shop frontend
- [x] Week 5-6: ServiceMonitors for orders/catalog/api-gateway/payments, KEDA ScaledObject (orders), HPA (orders)
- [x] Week 7: OpenCost deployment, Falco platform, Chaos Mesh experiments, remediation webhook + load tests in place
- [x] Keycloak realm + OIDC client config, Grafana SentinelOps dashboard (Week 8-9 prep)
- [x] Testing phase started: Vitest + Testing Library + jsdom, `Overview` screen test green (`npm run test`)
- [x] Supabase wired as database (client + `.env` + `src/utils/supabase.ts`, Overview/Login queries), Create User form with roles (admin/developer/viewer) via Supabase Auth, password visibility toggle added

## Remaining

- [ ] Runtime wiring: Istio VirtualServices, full Keycloak realm/OIDC client config (Goldilocks recommendations tooling)
- [ ] Testing phase continuation: backend pytest suite (FastAPI console API), Playwright E2E for console screens
- [ ] Live execution: cluster bootstrap (`make up`), CI/CD run, chaos runs, k6 cost comparison, demo video, blog post

## Week 1 — first end-to-end slice

```bash
cd sentinelops/sentinelops-infra
make up      # OpenTofu apply + Ansible k3s bootstrap
make demo    # local kind-based demo path
```

## Success metrics (blueprint section 8)

- Commit to running in prod: under 5 min
- Insecure deployments blocked: 100%
- Automatic rollback time: under 60 s
- Pod failure recovery: under 30 s, error rate under 1%
- Cost reduction: 30%+ via autoscaling
