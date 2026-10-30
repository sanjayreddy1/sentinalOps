from fastapi import APIRouter

router = APIRouter(prefix="/api/rollouts", tags=["rollouts"])


@router.get("/{service}")
def rollout(service: str) -> dict:
    return {
        "service": service,
        "canary_weight": 30,
        "analysis": {"success_rate": 0.999, "p95_latency_ms": 180, "threshold": "ok"},
    }
