from fastapi import APIRouter

router = APIRouter(prefix="/api/deployments", tags=["deployments"])


@router.get("")
def list_deployments() -> list[dict]:
    return [
        {
            "service": "catalog",
            "version": "sha-7f3a9c2",
            "env": "prod",
            "sync_status": "Synced",
            "rollout_state": "Canary (30%)",
        }
    ]
