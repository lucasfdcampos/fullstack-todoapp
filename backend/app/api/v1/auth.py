from fastapi import APIRouter, Depends, HTTPException
from app.schemas.token import Token
from app.schemas.auth import LoginRequest
from sqlalchemy.orm import Session
from app.db.db import get_db
from app.security import verify_password, create_access_token
from app.crud.user import get_user_by_username

router = APIRouter()

@router.post("/login", response_model=Token)
def login_for_access_token(request: LoginRequest, db: Session = Depends(get_db)):
    user = get_user_by_username(db, request.username)
    if user is None or not verify_password(request.password, user.hashed_password):
        raise HTTPException(
            status_code=400, 
            detail="Invalid credentials"
        )
    
    access_token = create_access_token(data={"sub": user.username})
    return Token(access_token=access_token, token_type="bearer")