from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from sqlalchemy.orm import Session
from auth import get_current_user, verify_password, create_access_token
from schemas import UserBase, Token, User, UserCreate
from database import get_db
from repositories import get_user, create_user


auth_router = APIRouter()


@auth_router.post(
    "/token",
    summary="To generate user access token (login)",
    status_code=status.HTTP_200_OK,
    response_model=Token,
)
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db),
):
    user = get_user(db=db, user=form_data)
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username, "user_id": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

@auth_router.post("/register", summary="Register user", status_code=status.HTTP_201_CREATED, response_model=User)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    existingUser = get_user(db=db, user=user)

    if existingUser:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists",
        )
    
    return create_user(db=db, user=user)


@auth_router.get("/user/me", summary="Get current user", response_model=UserBase)
async def get_authenticated_user(
    current_user: UserBase = Depends(get_current_user),
):
    return current_user
