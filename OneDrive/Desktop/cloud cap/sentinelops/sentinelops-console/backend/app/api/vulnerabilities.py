from fastapi import APIRouter

router = APIRouter(prefix="/api/vulnerabilities", tags=["vulnerabilities"])


@router.get("/")
def vulnerabilities() -> list[dict]:
    return [
        {"workload": "catalog", "severity": "HIGH", "package": "urllib3", "fixed_in": "2.2.3"},
        {"workload": "api-gateway", "severity": "MEDIUM", "package": "net/http", "fixed_in": "go-1.24.2"},
    ]
