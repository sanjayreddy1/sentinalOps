from fastapi import APIRouter

router = APIRouter(prefix="/api/overview", tags=["overview"])


@router.get("")
def overview() -> dict:
    return {
        "cluster_health": {"nodes_ready": 3, "nodes_total": 3},
        "deploys_today": 14,
        "open_incidents": 1,
        "monthly_cost": 212,
        "savings_vs_fixed": -37,
        "policy_blocks": 9,
        "request_rate": 42,
        "error_rate": 0.004,
    }
