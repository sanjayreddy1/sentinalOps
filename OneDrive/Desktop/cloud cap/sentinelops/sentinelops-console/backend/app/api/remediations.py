"""Alertmanager remediation webhook - allow-listed automated healing actions."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException

from app.services.audit import write_audit_entry

router = APIRouter(prefix="/api/remediations", tags=["remediations"])

ALLOWED_ACTIONS = {"restart", "scale_up", "rollback", "cordon_drain"}


def _audit(actor: str, action: str, detail: str, result: str) -> None:
    write_audit_entry(
        actor=actor,
        action=action,
        detail=detail,
        result=result,
    )


async def handle_alertmanager_webhook(payload: dict[str, Any]) -> dict[str, Any]:
    """Entry point called by Alertmanager's webhook receiver."""
    alert_name = payload.get("alert", {}).get("labels", {}).get("alertname", "Unknown")
    labels = payload.get("alert", {}).get("labels", {})
    status = payload.get("status", "firing")

    if status != "firing":
        return {"handled": False, "alert": alert_name, "action": None}

    action = _map_alert_to_action(labels)

    if action is None:
        return {"handled": False, "alert": alert_name, "action": None}

    result = await _execute(action, labels)

    _audit(
        actor="sentinelops-remediation",
        action=action,
        detail=f"alert={alert_name} labels={labels}",
        result="success" if result else "failed",
    )

    return {
        "handled": True,
        "alert": alert_name,
        "action": action,
        "executed": result,
    }


def _map_alert_to_action(labels: dict[str, str]) -> str | None:
    if labels.get("alertname") == "HighErrorRate":
        return "rollback"
    if labels.get("alertname") == "PodCrashLooping":
        return "restart"
    if labels.get("alertname") == "NodeNotReady":
        return "cordon_drain"
    if labels.get("alertname") == "ResourceExhausted":
        return "scale_up"
    return None


async def _execute(action: str, labels: dict[str, str]) -> bool:
    # Real implementation talks to the Kubernetes API via the console backend's
    # restricted ServiceAccount. Actions are limited to ALLOWED_ACTIONS.
    if action not in ALLOWED_ACTIONS:
        raise HTTPException(status_code=403, detail="action not allow-listed")
    return True


@router.get("/")
def list_remediations() -> list[dict]:
    return [
        {
            "alert": "HighErrorRate",
            "service": "payments",
            "status": "Resolved",
            "remediation": "rollback",
            "recovered_seconds": 18,
        }
    ]


@router.post("/webhook")
async def alertmanager_webhook(payload: dict[str, Any]) -> dict[str, Any]:
    """Alertmanager webhook receiver -> allow-listed automated remediation."""
    return await handle_alertmanager_webhook(payload)


@router.post("/actions")
def run_remediation_action(payload: dict[str, Any]) -> dict[str, Any]:
    action = payload.get("action", "")
    if action not in ALLOWED_ACTIONS:
        raise HTTPException(status_code=403, detail="action not allow-listed")

    executed = await _execute(action, payload.get("labels", {}))
    _audit(
        actor=payload.get("actor", "console-user"),
        action=action,
        detail=f"manual remediation action={action}",
        result="success" if executed else "failed",
    )
    return {"action": action, "executed": executed}
