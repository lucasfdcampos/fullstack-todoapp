from fastapi import APIRouter
from app.api.v1 import todos, user

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok"}

router.include_router(user.router, prefix="/users", tags=["users"])
router.include_router(todos.router, prefix="/todos", tags=["todos"])