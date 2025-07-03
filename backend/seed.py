import json
from database import engine, SessionLocal, Base
from models import Item, Location, Inventory

Base.metadata.create_all(bind=engine)
session = SessionLocal()

with open("inventory_data.json", "r") as f:
    data = json.load(f)

for item in data:
    # supply_item = Item(
    #     name=item["name"],
    #     description=item["description"],
    #     sku=item["sku"]
    # )

    # location = Location(
    #     name=item["name"],
    #     address=item["address"]
    # )

    inventory = Inventory(
        item_id=item["item_id"],
        location_id=item["location_id"],
        quantity=item["quantity"],
        status=item["status"]
    )

    # session.add()
    session.add(inventory)


session.commit()