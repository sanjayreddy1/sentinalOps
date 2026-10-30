# SentinelOps — 3-Minute Demo Script (Blueprint §9)

**Goal:** a single 3-minute video that proves the platform works end to end.

1. **Push a code change; show CI scanning, signing and the GitOps commit** (30 s)
   - Push to `sentinelops-app` main → GitHub Actions: unit tests → gitleaks → buildx → Trivy (fail HIGH/CRITICAL) → Syft SBOM → Cosign sign → update image in `sentinelops-gitops` overlay → open PR → ArgoCD syncs.

2. **Watch ArgoCD sync and the canary shift traffic** (30 s)
   - Console → Deployments → Release Detail: canary progress bar (10 → 30 → 60 → 100%), live success rate & p95 latency vs thresholds.

3. **Try deploying a root container and an unsigned image; show Kyverno blocking both** (30 s)
   - `kubectl apply -f` a privileged/root container and an `latest`-tagged unsigned image → both rejected by ClusterPolicies with clear messages.

4. **Ship a faulty version; show the automatic rollback** (40 s)
   - Flip the error-injection env var (`ERROR_RATE`) via GitOps overlay, watch Argo Rollouts analysis fail → auto-shift back to stable.

5. **Kill a pod and a node under load; show recovery graphs** (30 s)
   - Chaos Mesh: PodChaos (orders) + NodeChaos (worker) during k6 load → console Chaos Lab shows recovery under 30 s.

6. **Show the cost screen with the autoscaling savings** (20 s)
   - OpenCost: before (fixed replicas) vs after (KEDA scale-to-zero) → cost reduction ≥ 30%.

**Script notes:** record with OBS; keep terminal output minimal; narrate each step's hypothesis/result pair (blueprint §5.9 format).
