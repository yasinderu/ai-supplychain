from database import Base
from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime, timezone

metadata = Base.metadata

class Item(Base):
    __tablename__ = "items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=False)
    description = Column(Text)
    sku = Column(Text, unique=True, nullable=False)
    category = Column(Text)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    inventories = relationship("Inventory", back_populates="item")
    transactions = relationship("Transaction", back_populates="item")

class Location(Base):
    __tablename__ = "locations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(Text, nullable=False)
    address = Column(Text)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))

    inventories = relationship("Inventory", back_populates="location")
    transactions_from = relationship(
        "Transaction", back_populates="from_location", foreign_keys="Transaction.from_location_id"
    )
    transactions_to = relationship(
        "Transaction", back_populates="to_location", foreign_keys="Transaction.to_location_id"
    )

class Inventory(Base):
    __tablename__ = "inventories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    item_id = Column(UUID(as_uuid=True), ForeignKey("items.id"), nullable=False)
    location_id = Column(UUID(as_uuid=True), ForeignKey("locations.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    status = Column(Text, nullable=False, default="in_stock")
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    item = relationship("Item", back_populates="inventories")
    location = relationship("Location", back_populates="inventories")

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    item_id = Column(UUID(as_uuid=True), ForeignKey("items.id"), nullable=False)
    from_location_id = Column(UUID(as_uuid=True), ForeignKey("locations.id"), nullable=True)
    to_location_id = Column(UUID(as_uuid=True), ForeignKey("locations.id"), nullable=True)
    quantity = Column(Integer, nullable=False)
    timestamp = Column(DateTime, default=datetime.now(timezone.utc))
    notes = Column(Text)

    item = relationship("Item", back_populates="transactions")
    from_location = relationship(
        "Location", foreign_keys=[from_location_id], back_populates="transactions_from"
    )
    to_location = relationship(
        "Location", foreign_keys=[to_location_id], back_populates="transactions_to"
    )
