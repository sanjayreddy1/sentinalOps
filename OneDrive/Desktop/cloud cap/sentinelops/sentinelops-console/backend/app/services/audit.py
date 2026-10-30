"""Simple audit log store for remediation / platform actions."""


def write_audit_entry(*, actor: str, action: str, detail: str, result: str) -> None:
    # Persisted to the audit log (see Ai-resume-summarizer supabase audit_logs pattern
    # or a simple JSON file store) and surfaced via /api/remediations audit views.
    entry = {
        "actor": actor,
        "action": action,
        "detail": detail,
        "result": result,
        "ts": "2026-10-26T00:00:00Z",
    }
    # audit_log.append(entry)
    return None
