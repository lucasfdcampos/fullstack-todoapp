from fastapi import FastAPI
from app.api.v1.routes import router as api_v1_router

app = FastAPI(title="Todo App", version="0.0.1")

app.include_router(api_v1_router, prefix="/api/v1", tags=["v1"])
