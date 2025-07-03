import json
import chromadb
from sentence_transformers import SentenceTransformer
import os

# CHROMA_DB_PATH = "./chroma_data"

# os.makedirs(CHROMA_DB_PATH, exist_ok=True)

# initialize Chroma
client = chromadb.Client()
collection = client.create_collection(name="inventory_data")

# load embeddings model
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# load your data
with open("inventory_ingestion.json", "r") as f:
    data = json.load(f)

print("data", data)

# store in Chroma
for item in data:
    text = (
        f"Item {item['item_name']} is located at "
        f"{item['location']} with quantity {item['quantity']} "
        f"and status {item['status']}."
    )
    embedding = embedder.encode(text).tolist()
    collection.add(
        documents=[text],
        embeddings=[embedding],
        ids=[item["item_name"]],
    )

collection.count()

print("✅ Data indexed in ChromaDB.")