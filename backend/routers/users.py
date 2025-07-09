from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas import User, UserCreate
from repositories import create_user

user_router = APIRouter(prefix="/users")


@user_router.post(
    "/register",
    summary="Register user",
    status_code=status.HTTP_201_CREATED,
    response_model=User,
)
async def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    return create_user(db=db, user=user_data)
