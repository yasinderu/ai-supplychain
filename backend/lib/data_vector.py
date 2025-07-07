from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.config import Settings
import schemas

embedder = SentenceTransformer("all-MiniLM-L6-v2")

# set up chroma client
client = chromadb.PersistentClient(path="./chroma_data")
collection = client.get_collection("inventory_data")

def index_inventory_record(inventory=schemas.InventoryCreate):

    prompt = (
        f"Item {inventory['item_name']} is located at "
        f"{inventory['location_name']} with quantity of {inventory['quantity']} "
        f"and status of {inventory['status']} "
    )
    embedding = embedder.encode(prompt).tolist()
    collection.add(
        documents=[prompt],
        embeddings=[embedding],
        ids=[inventory['id']]
    )

    collection.count()

    print("Data indexed in chromaDB")

def update_inventory_record(inventory):
    prompt = (
        f"Item {inventory['item_name']} is located at "
        f"{inventory['location_name']} with quantity of {inventory['quantity']} "
        f"and status of {inventory['status']} "
    )
    embedding = embedder.encode(prompt).tolist()
    collection.update(
        documents=[prompt],
        embeddings=[embedding],
        ids=[inventory['id']]
    )

    print("Data updated in chromaDB")
