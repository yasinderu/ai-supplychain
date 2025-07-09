from fastapi import APIRouter, status, Depends
from schemas import Transaction, TransactionCreate
from repositories import get_transactions, get_transaction_detail
from sqlalchemy.orm import Session
from database import get_db
from uuid import UUID
from auth import get_current_user

transaction_router = APIRouter(
    prefix="/transactions", dependencies=[Depends(get_current_user)]
)


@transaction_router.get(
    "/",
    summary="Get list all transaction records",
    status_code=status.HTTP_200_OK,
    response_model=list[Transaction],
)
async def get_list_transaction(db: Session = Depends(get_db)):
    return get_transactions(db=db)


@transaction_router.get(
    "/{transaction_id}",
    summary="Get transaction details",
    status_code=status.HTTP_200_OK,
    response_model=Transaction,
)
async def get_transaction_detail(transaction_id: UUID, db: Session = Depends(get_db)):
    return get_transaction_detail(db=db, transaction_id=transaction_id)
