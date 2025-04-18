from fastapi import APIRouter, Depends, status
from app.schemas.todo import TodoCreate, TodoResponse
from sqlalchemy.orm import Session
from app.crud import todo as crud_todo
from app.db.db import get_db
from app.security import get_current_user
from app.models.user import User

router = APIRouter(dependencies=[Depends(get_current_user)])

@router.post("", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
def create_todo(
    todo: TodoCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)):

    return crud_todo.create_todo(db=db, todo=todo, user_id=current_user.id)