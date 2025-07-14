from fastapi import APIRouter, status, Depends, HTTPException
from schemas import Inventory, InventoryCreate, InventoryUpdate
from repositories import (
    get_inventories,
    get_inventory,
    create_inventory,
    update_inventory,
    delete_inventory
)
from sqlalchemy.orm import Session
from database import get_db
from uuid import UUID
from auth import get_current_user

inventory_router = APIRouter(
    prefix="/inventories", dependencies=[Depends(get_current_user)]
)


@inventory_router.get(
    "/",
    summary="List all inventory details (e.g item name, item location, item quantity)",
    status_code=status.HTTP_200_OK,
    response_model=list[Inventory],
)
async def get_list_inventory(db: Session = Depends(get_db)):
    return get_inventories(db)


@inventory_router.get(
    "/{inventory_id}",
    summary="Get inventory detail",
    status_code=status.HTTP_200_OK,
    response_model=Inventory,
)
async def get_inventory_detail(inventory_id: UUID, db: Session = Depends(get_db)):
    return get_inventory(db, inventory_id)


@inventory_router.post(
    "/",
    summary="Create inventory record (add item to inventory)",
    status_code=status.HTTP_201_CREATED,
    response_model=Inventory,
)
async def create_inventory_record(
    inventory: InventoryCreate, db: Session = Depends(get_db)
):
    return create_inventory(db=db, inventory=inventory)


@inventory_router.patch(
    "/{inventory_id}",
    summary="Partial update inventory record",
    status_code=status.HTTP_200_OK,
    response_model=Inventory,
)
async def partial_update_inventory(
    inventory_id: UUID,
    inventory_update: InventoryUpdate,
    db: Session = Depends(get_db),
):
    updated_inventory = update_inventory(
        inventory_id=inventory_id, update_inventory=inventory_update, db=db
    )
    if updated_inventory is not None:
        return updated_inventory
    else:
        raise HTTPException(status_code=400, detail="Inventory not found")
    
@inventory_router.delete("/{inventory_id}", summary="Delete inventory record", status_code=status.HTTP_200_OK)
async def delete_inventory_record( inventory_id: UUID, db: Session=Depends(get_db)):
    deleted_inventory = delete_inventory(db=db, inventory_id=inventory_id)

    if deleted_inventory is None:
        raise HTTPException(status_code=404, detail="Inventory not found")
    return {"message": "Sucess"}
