from fastapi import APIRouter

router = APIRouter(prefix="/api/audit", tags=["audit"])


@router.get("/")
def list_audit_entries() -> list[dict]:
    # Audit entries written by the remediation webhook and console actions
    return [
        {
            "audit_id": "audit-1042",
            "actor": "sentinelops-remediation",
            "action": "rollback",
            "detail": "alert=HighErrorRate",
            "result": "success",
            "ts": "2026-10-26T00:00:00Z",
        }
    ]
