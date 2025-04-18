from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.schemas.todo import Todo, TodoCreate, TodoUpdate, TodoResponse
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

@router.get("", response_model=List[Todo])
def read_todos(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)):

    return crud_todo.get_todos(db=db, user_id=current_user.id)

@router.get("/{todo_id}", response_model=Todo)
def read_todo(
    todo_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)):

    get = crud_todo.get_todo(
        db=db, 
        todo_id=todo_id, 
        user_id=current_user.id
    )
    if get is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return get

@router.put("/{todo_id}", response_model=Todo)
def update_todo(
    todo_id: int, 
    todo: TodoUpdate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)):

    updated = crud_todo.update_todo(
        db=db, 
        todo_id=todo_id, 
        todo_data=todo, 
        user_id=current_user.id
    )
    if updated is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return updated

@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(
    todo_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)):

    deleted = crud_todo.delete_todo(
        db=db, 
        todo_id=todo_id, 
        user_id=current_user.id
    )
    if deleted is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return None

@router.patch("/{todo_id}/completed", response_model=Todo)
def set_todo_completed(
    todo_id: int, 
    completed: bool, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)):

    updated = crud_todo.set_todo_completed(
        db=db, 
        todo_id=todo_id, 
        completed=completed, 
        user_id=current_user.id
    )
    if updated is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return updated