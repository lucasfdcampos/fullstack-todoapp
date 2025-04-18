from pydantic import BaseModel
from typing import Optional

class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False

class TodoResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]

    class Config:
        from_attributes = True

class Todo(TodoCreate):
    id: int

    class Config:
        from_attributes = True