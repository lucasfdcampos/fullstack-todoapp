from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routes import router as api_v1_router
from app.api.v1.auth import router as auth_router

app = FastAPI(title="Todo App", version="1.1.0")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001"
    "http://127.0.0.1:3001",
    "http://192.168.0.125:3000",
    "http://192.168.0.125:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=[
        "Content-Type", 
        "Set-Cookie", 
        "Access-Control-Allow-Headers", 
        "Access-Control-Allow-Origin", 
        "Authorization"
    ],
)

app.include_router(api_v1_router, prefix="/api/v1", tags=["v1"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["auth"])