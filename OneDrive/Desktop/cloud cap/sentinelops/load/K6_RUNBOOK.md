# SentinelOps — Load Test Runbook (Blueprint §5.9 / §8)

Goal: measure (a) availability under chaos and (b) cost reduction from autoscaling.

## Setup
- k6: `k6 run -e TARGET_URL=http://localhost:8080 -e TARGET_PATH=/orders sentinelops/load/k6-traffic.js`
- Or against the deployed cluster via port-forward / ingress.

## Cost comparison (OpenCost)
1. Turn **autoscaling off**: fix workloads to `8 replicas` in the overlay (dev/staging).
2. Run the same k6 load test → record per-workload cost via OpenCost.
3. Enable **KEDA scale-to-zero / HPA** autoscaling, commit to GitOps.
4. Re-run the same k6 load test → compare cost.
5. Report: target ≥ 30% cost reduction.

## Chaos experiments (k6 + Chaos Mesh)
- PodChaos on `orders` during load → expect recovery < 30 s, error rate < 1%.
- NetworkChaos 500 ms delay → expect retries + circuit breaking, latency alert fires.
- StressChaos 90% CPU → expect HPA to scale out.
- Node failure → expect rescheduling within recovery target.
- Bad release → expect automatic rollback (< 60 s).

## Success metrics targets (Blueprint §8)
- Commit → running in prod: < 5 min
- Insecure deployments blocked: 100%
- Automatic rollback time: < 60 s
- Pod failure recovery: < 30 s, error rate < 1%
- Cost reduction: ≥ 30%
- Availability under chaos: ≥ 99.5%
