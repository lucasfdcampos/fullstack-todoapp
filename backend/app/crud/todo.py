from sqlalchemy.orm import Session
from app.models.todo import Todo
from app.schemas.todo import TodoCreate
from datetime import datetime

def create_todo(db: Session, todo: TodoCreate, user_id: int):
    db_todo = Todo(**todo.dict(), user_id=user_id)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def get_todos(db: Session, user_id: int):
    return (
            db.query(Todo)
            .filter(Todo.user_id == user_id)
            .order_by(Todo.created_at.asc())
            .all()
    )

def get_todo(db: Session, todo_id: int, user_id: int):
    return db.query(Todo).filter(Todo.id == todo_id, Todo.user_id == user_id).first()

def update_todo(db: Session, todo_id: int, todo_data: TodoCreate, user_id: int):
    db_todo = get_todo(db, todo_id, user_id)
    if db_todo is None:
        return None

    if todo_data.title is not None:
        db_todo.title = todo_data.title
    if todo_data.description is not None:
        db_todo.description = todo_data.description

    db_todo.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_todo)
    return db_todo

def delete_todo(db: Session, todo_id: int, user_id: int):
    db_todo = get_todo(db, todo_id, user_id)
    if db_todo is None:
        return None
    db.delete(db_todo)
    db.commit()
    return db_todo

def set_todo_completed(db: Session, todo_id: int, completed: bool, user_id: int):
    db_todo = get_todo(db, todo_id, user_id)
    if db_todo is None:
        return None
    db_todo.completed = completed
    db.commit()
    db.refresh(db_todo)
    return db_todo