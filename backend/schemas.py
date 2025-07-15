from pydantic import BaseModel, ConfigDict
from datetime import datetime
from uuid import UUID
from typing import Optional


## Auth schema
class Token(BaseModel):
    access_token: str
    token_type: str


# User schema
class UserBase(BaseModel):
    """Base schema for user data"""

    username: str


class UserCreate(UserBase):
    """Schema for creating new user data"""

    fullname: Optional[str] = None
    password: str


class User(UserBase):
    """Schema for reading user data"""

    id: UUID
    created_at: datetime
    updated_at: datetime


# AI Question Schema
class QuestionRequest(BaseModel):
    """Base schema for AI assitant"""

    question: str


# Location Schema
class LocationBase(BaseModel):
    """Base schema for location data"""

    name: str
    address: Optional[str] = None


class LocationCreate(LocationBase):
    """Schema for creating new location data"""

    pass


class Location(LocationBase):
    id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Item Schema
class ItemBase(BaseModel):
    """Base schema for item data."""

    name: str
    description: str
    sku: str
    category: Optional[str] = None


class ItemCreate(ItemBase):
    """Schema for creating new item."""

    pass


class Item(ItemBase):
    """Schema for reading item data."""

    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Inventory Schema
class InventoryBase(BaseModel):
    """Base schema for inventory data."""

    item_id: UUID
    location_id: UUID
    quantity: int
    status: str


class InventoryCreate(InventoryBase):
    """Schema for creating new inventiory record."""

    # item_name: str
    # location_name: str


class InventoryUpdate(InventoryBase):
    """Schema for updating inventory records (e.g quantity)"""

    quantity: Optional[int] = None
    status: Optional[str] = None


class Inventory(InventoryBase):
    """Schema for reading inventory data."""

    id: UUID
    updated_at: datetime
    item: Item
    location: Location

    model_config = ConfigDict(from_attributes=True)


# Transaction Schema
class TransactionBase(BaseModel):
    """Base schema for transaction data."""

    item_id: UUID
    from_location_id: UUID
    to_location_id: UUID
    quantity: int
    notes: Optional[str] = None


class TransactionCreate(TransactionBase):
    """Schema for creating new transaction record."""
    pass


class Transaction(TransactionBase):
    """Schema for reading transaction data."""

    id: UUID
    timestamp: datetime
    item: Item
    from_location: Optional[Location] = None
    to_location: Optional[Location] = None

    model_config = ConfigDict(from_attributes=True)

# Chat schema
class ChatBase(BaseModel):
    """Base schema for chat data"""
    user_id: UUID
    text: str
    sender: str

class ChatCreate(ChatBase):
    """Schema for creating chat"""
    pass

class Chat(ChatBase):
    id: UUID
    user: Optional[User] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
