from fastapi import APIRouter

router = APIRouter(prefix="/api/costs", tags=["costs"])


@router.get("/")
def costs() -> dict:
    return {
        "monthly_cost": 212,
        "savings_vs_fixed": -37,
        "by_namespace": {"sentinelops": 212},
        "top_savings": [
            {"recommendation": "scale-to-zero payments when idle", "saving_pct": 41},
        ],
    }
