from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import Item, ItemCreate, Item, ItemUpdate
from repositories import get_item, get_items, create_item, delete_item_data, update_item
from auth import get_current_user
from database import get_db
from uuid import UUID


item_router = APIRouter(prefix="/items", dependencies=[Depends(get_current_user)])


@item_router.get(
    "/",
    summary="List all items",
    status_code=status.HTTP_200_OK,
    response_model=list[Item],
)
async def get_list_item(db: Session = Depends(get_db)):
    return get_items(db)


@item_router.get(
    "/{item_id}",
    summary="Get item detail",
    status_code=status.HTTP_200_OK,
    response_model=Item,
)
async def get_item_detail(item_id: UUID, db: Session = Depends(get_db)):
    return get_item(db, item_id)


@item_router.post(
    "/",
    summary="Create a new item",
    status_code=status.HTTP_201_CREATED,
    response_model=Item,
)
async def create_new_item(item: ItemCreate, db: Session = Depends(get_db)):
    return create_item(db, item)

@item_router.patch("/{item_id}", summary="Update item", status_code=status.HTTP_200_OK, response_model=Item)
async def item_update(item: ItemUpdate, item_id: UUID, db: Session = Depends(get_db)):
    return update_item(item=item, db=db, item_id=item_id)

@item_router.delete("/{item_id}", summary="Delete item", status_code=status.HTTP_200_OK)
async def delete_item(item_id: UUID, db: Session=Depends(get_db)):
    deleted_item = delete_item_data(db=db, item_id=item_id)

    if deleted_item is None:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return {"message": "Sucess"}