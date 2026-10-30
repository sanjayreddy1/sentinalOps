from fastapi import APIRouter

router = APIRouter(prefix="/api/policy-violations", tags=["policy"])


@router.get("/")
def policy_violations() -> list[dict]:
    return [
        {
            "policy": "restrict-image-registry",
            "resource": "pod/catalog",
            "user": "asha",
            "reason": "image tag not sha- prefixed",
        }
    ]
