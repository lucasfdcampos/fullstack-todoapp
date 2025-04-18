from fastapi import FastAPI
from app.api.v1.routes import router as api_v1_router
from app.api.v1.auth import router as auth_router

app = FastAPI(title="Todo App", version="1.0.1")

app.include_router(api_v1_router, prefix="/api/v1", tags=["v1"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["auth"])