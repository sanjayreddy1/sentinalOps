from fastapi import APIRouter

router = APIRouter(prefix="/api/chaos", tags=["chaos"])


@router.get("/experiments")
def chaos_experiments() -> list[dict]:
    return [
        {
            "name": "pod-kill-orders",
            "hypothesis": "orders recovers from pod kill under load",
            "blast_radius": "orders deployment",
            "last_result": "pending",
        }
    ]


@router.post("/run")
def run_chaos(experiment: dict) -> dict:
    return {"experiment": experiment, "status": "started", "verdict": None}
