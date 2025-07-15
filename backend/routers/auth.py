from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from sqlalchemy.orm import Session
from auth import get_current_user, verify_password, create_access_token
from schemas import UserBase, Token
from database import get_db
from repositories import get_user


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
            detail="Incorect usernam or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username, "user_id": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}


@auth_router.get("/user/me", summary="Get current user", response_model=UserBase)
async def get_authenticated_user(
    current_user: UserBase = Depends(get_current_user),
):
    return current_user
