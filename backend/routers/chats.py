from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import Chat, ChatCreate
from repositories import get_chats, create_chat
from auth import get_current_user
from database import get_db
from uuid import UUID


chat_router = APIRouter(prefix="/chats", dependencies=[Depends(get_current_user)])


@chat_router.get(
    "/{user_id}",
    summary="List all user's chats",
    status_code=status.HTTP_200_OK,
    response_model=list[Chat],
)
async def get_chat_list(user_id: UUID, db: Session = Depends(get_db)):
    return get_chats(db=db, user_id=user_id)

@chat_router.post(
    "/",
    summary="Create user's chat",
    status_code=status.HTTP_201_CREATED,
    response_model=Chat
)
async def create_user_chat(chat: ChatCreate, db: Session = Depends(get_db)):
    return create_chat(db=db, chat=chat)