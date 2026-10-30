"""SentinelOps Console backend - FastAPI service."""

from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import overview, deployments, rollouts, vulnerabilities, policy, incidents, remediations, costs, chaos, audit

app = FastAPI(title="SentinelOps Console API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(overview.router)
app.include_router(deployments.router)
app.include_router(rollouts.router)
app.include_router(vulnerabilities.router)
app.include_router(policy.router)
app.include_router(incidents.router)
app.include_router(remediations.router)
app.include_router(costs.router)
app.include_router(chaos.router)
app.include_router(audit.router)


@app.get("/healthz")
def healthz() -> dict[str, Any]:
    return {"status": "ok"}


@app.get("/readyz")
def readyz() -> dict[str, Any]:
    return {"status": "ok"}
