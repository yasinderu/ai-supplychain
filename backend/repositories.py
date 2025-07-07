from sqlalchemy.orm import Session
from datetime import datetime
from uuid import UUID

import models, schemas
from lib import data_vector

## Repositories for item
def get_items(db: Session, skip: int=0, limit: int=100):
    """Retrieve item data from database"""
    return db.query(models.Item).offset(skip).limit(limit).all()

def get_item(db: Session, item_id: UUID):
    """Retrieve item detail from database"""
    return db.query(models.Item).filter(models.Item.id == item_id).first()

def update_item(db: Session, update_item: models.Item, item_id: UUID):
    """Update item data in the database"""
    pass

def create_item(db: Session, item:schemas.ItemCreate):
    """Create or add new item data to database."""
    db_item = models.Item(
        name=item.name,
        description=item.description,
        sku=item.sku,
        category=item.category
    )

    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    return db_item

## Repositories for inventory
def get_inventories(db: Session, skip: int=0, limit: int=100):
    """Retrieve list of inventory data from database"""
    return db.query(models.Inventory).offset(skip).limit(limit).all()

def get_inventory(db: Session, inventory_id: UUID):
    """Retrieve inventory detail from database"""
    return db.query(models.Inventory).filter(models.Inventory.id == inventory_id).first()

def create_intventory(db: Session, inventory:schemas.InventoryCreate):
    """Create or add inventory record to database."""
    try:
        db_inventory = models.Inventory(
        item_id=inventory.item_id,
        location_id=inventory.location_id,
        quantity=inventory.quantity,
        status=inventory.status,
        )

        db.add(db_inventory)
        
        inventory_vector = {"id": str(db_inventory.id), "quantity": inventory.quantity, "status": inventory.status, "item_name": inventory.item_name, "location_name": inventory.location_name}

        data_vector.index_inventory_record(inventory=inventory_vector)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    finally:
        db.commit()
        db.refresh(db_inventory)
        return db_inventory
    
## Repositories for location
def get_locations(db: Session, skip:int=0, limit: int=100):
    """Retrieve list of location from database"""
    return db.query(models.Location).offset(skip).limit(limit)

def get_location_detail(db: Session, location_id: UUID):
    """Retrieve location details from database"""
    return db.query(models.Location).filter(models.Location.id == location_id).first()

def create_location(db: Session, location: schemas.LocationCreate):
    """Create or add new location data in database"""
    db_location = models.Location(
        name=location.name,
        address=location.address,
    )

    db.add(db_location)
    db.commit()
    db.refresh(db_location)

    return db_location

## Repositories for transaction
def get_transactions(db: Session, skip: int=0, limit: int=100):
    """Retrieve all transaction records from database"""
    return db.query(models.Transaction).offset(skip).limit(limit)

def get_transaction_detail(db:Session, transaction_id: UUID):
    """Retrieve transaction detail from database"""
    return db.query(models.Transaction).filter(models.Transaction.id == transaction_id).first()