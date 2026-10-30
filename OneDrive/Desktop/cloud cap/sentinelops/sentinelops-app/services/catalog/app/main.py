from contextlib import asynccontextmanager

from fastapi import FastAPI
from prometheus_client import Counter, generate_latest, RequestHandler

REQUESTS = Counter("api_requests_total", "Total API requests", ["service", "status"])


@asynccontextmanager
async def lifespan(app: FastAPI):
    return None


app = FastAPI(title="SentinelOps Catalog", lifespan=lifespan)


@app.get("/healthz")
def healthz():
    return {"status": "ok"}


@app.get("/readyz")
def readyz():
    return {"status": "ok"}


@app.get("/metrics")
def metrics():
    return generate_latest(REQUEST_HANDLER)


REQUEST_HANDLER = RequestHandler()
