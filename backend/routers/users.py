from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas import User, UserCreate, UserBase
from repositories import create_user, get_user

user_router = APIRouter(prefix="/users")


@user_router.post(
    "/register",
    summary="Register user",
    status_code=status.HTTP_201_CREATED,
    response_model=User,
)
async def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    return create_user(db=db, user=user_data)

@user_router.post("/", summary="Get user data", status_code=status.HTTP_200_OK, response_model=User)
async def get_user_detail(user: UserBase, db: Session=Depends(get_db)):
    return get_user(user=user, db=db)
