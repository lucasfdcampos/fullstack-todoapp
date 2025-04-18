from sqlalchemy.orm import Session
from app.models.todo import Todo
from app.schemas.todo import TodoCreate

def create_todo(db: Session, todo: TodoCreate, user_id: int):
    db_todo = Todo(**todo.dict(), user_id=user_id)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo