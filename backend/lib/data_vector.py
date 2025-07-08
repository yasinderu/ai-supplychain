from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.config import Settings
import schemas
import os

sentence_embedding = os.environ["LOCAL_SENTENCE_VARIABLE_MODEL_DIR"]


# set up chroma client
client = chromadb.PersistentClient(path="./chroma_data")
collection = client.get_collection("inventory_data")

embedder = SentenceTransformer(sentence_embedding)


def index_inventory_record(inventory=schemas.InventoryCreate):
    """To index the inventory data to data vector"""
    prompt = (
        f"Item {inventory['item_name']} is located at "
        f"{inventory['location_name']} with quantity of {inventory['quantity']} "
        f"and status of {inventory['status']} "
    )
    embedding = embedder.encode(prompt).tolist()
    collection.add(documents=[prompt], embeddings=[embedding], ids=[inventory["id"]])

    collection.count()

    print("Data indexed in chromaDB")


def update_inventory_record(inventory):
    """To re-index or update the inventory data in data vector"""
    prompt = (
        f"Item {inventory['item_name']} is located at "
        f"{inventory['location_name']} with quantity of {inventory['quantity']} "
        f"and status of {inventory['status']} "
    )
    embedding = embedder.encode(prompt).tolist()
    collection.update(documents=[prompt], embeddings=[embedding], ids=[inventory["id"]])

    print("Data updated in chromaDB")


def index_transaction_record(transaction):
    """To index the transaction data to data vector"""
    prompt = (
        f"Item {transaction.item.name} is moved from "
        f"{transaction.location.from_location.name} to "
        f"{transaction.location.to_location.name} with the quantity of {transaction.quantity}"
    )
    embedding = embedder.encode(prompt).tolist()
    collection.add(
        documents=[prompt], embeddings=[embedding], ids=[str(transaction.id)]
    )
