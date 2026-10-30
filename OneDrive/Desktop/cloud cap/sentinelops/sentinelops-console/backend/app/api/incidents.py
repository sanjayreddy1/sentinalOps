from fastapi import APIRouter

router = APIRouter(prefix="/api/incidents", tags=["incidents"])


@router.get("/")
def incidents() -> list[dict]:
    return [
        {
            "alert": "HighErrorRate",
            "service": "payments",
            "status": "Resolved",
            "remediation": "restart deployment payments",
            "recovered_seconds": 18,
        }
    ]
