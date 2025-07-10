from sqlalchemy.orm import Session
from datetime import datetime
from uuid import UUID

import models, schemas

from lib import data_vector
import auth


## Repositories for user
def get_user(db: Session, user: schemas.UserBase):
    """Retrieve user data from database"""
    username = user.username
    return db.query(models.User).filter(models.User.username == username).first()


def create_user(db: Session, user: schemas.UserCreate):
    """Create or add user data to database"""
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        password=hashed_password,
        fullname=user.fullname,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


## Repositories for item
def get_items(db: Session, skip: int = 0, limit: int = 100):
    """Retrieve item data from database"""
    return db.query(models.Item).offset(skip).limit(limit).all()


def get_item(db: Session, item_id: UUID):
    """Retrieve item detail from database"""
    return db.query(models.Item).filter(models.Item.id == item_id).first()


def update_item(db: Session, update_item: models.Item, item_id: UUID):
    """Update item data in the database"""
    pass


def create_item(db: Session, item: schemas.ItemCreate):
    """Create or add new item data to database."""
    db_item = models.Item(
        name=item.name,
        description=item.description,
        sku=item.sku,
        category=item.category,
    )

    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    return db_item


## Repositories for inventory
def get_inventories(db: Session, skip: int = 0, limit: int = 100):
    """Retrieve list of inventory data from database"""
    return db.query(models.Inventory).offset(skip).limit(limit).all()


def get_inventory(db: Session, inventory_id: UUID):
    """Retrieve inventory detail from database"""
    return (
        db.query(models.Inventory).filter(models.Inventory.id == inventory_id).first()
    )


def create_inventory(db: Session, inventory: schemas.InventoryCreate):
    """Create or add inventory record to database."""
    db_inventory = models.Inventory(
        item_id=inventory.item_id,
        location_id=inventory.location_id,
        quantity=inventory.quantity,
        status=inventory.status,
    )

    db.add(db_inventory)
    db.commit()
    db.refresh(db_inventory)

    inventory_vector = {
        "id": str(db_inventory.id),
        "quantity": inventory.quantity,
        "status": inventory.status,
        "item_name": inventory.item_name,
        "location_name": inventory.location_name,
    }

    data_vector.index_inventory_record(inventory=inventory_vector)
    return db_inventory


def update_inventory(
    db: Session, update_inventory: schemas.InventoryUpdate, inventory_id: UUID
):
    inventory = get_inventory(db=db, inventory_id=inventory_id)
    if inventory is not None:
        inventory.quantity = (
            update_inventory.quantity
            if update_inventory.quantity != None
            else inventory.quantity
        )
        inventory.status = (
            update_inventory.status
            if update_inventory.status != None
            else inventory.status
        )

        db.add(inventory)

        inventory_vector = {
            "item_name": inventory.item.name,
            "location_name": inventory.location.name,
            "quantity": inventory.quantity,
            "status": inventory.status,
            "id": str(inventory.id),
        }
        db.commit()
        db.refresh(inventory)

        # data_vector.update_inventory_record(inventory=inventory_vector)
        return inventory
    else:
        return None


## Repositories for location
def get_locations(db: Session, skip: int = 0, limit: int = 100):
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
def get_transactions(db: Session, skip: int = 0, limit: int = 100):
    """Retrieve all transaction records from database"""
    return db.query(models.Transaction).offset(skip).limit(limit)


def get_transaction_detail(db: Session, transaction_id: UUID):
    """Retrieve transaction detail from database"""
    return (
        db.query(models.Transaction)
        .filter(models.Transaction.id == transaction_id)
        .first()
    )


def create_transaction(db: Session, transaction: schemas.TransactionCreate):
    """Create transaction record to database"""
    db_transaction = models.Transaction(
        item_id=transaction.item_id,
        from_location_id=transaction.from_transaction_id,
        to_location_id=transaction.to_location_id,
        quantity=transaction.quantity,
        notes=transaction.notes,
    )

    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)

    return db_transaction
