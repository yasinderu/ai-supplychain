from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.config import Settings

embedder = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# set up chroma client
chroma_client = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory="./chroma_db"
))
collection = chroma_client.get_or_create_collection("inventory")

# for item in dummy_data:
#     doc_text = f"""
#     Item code: {item['item_code']}
#     Name: {item['name']}
#     Description: {item['description']}
#     Quantity: {item['quantity']}
#     Status: {item['status']}
#     Location: {item['location']}
#     """
#     embedding = embedder.encode(doc_text)
#     collection.add(
#         documents=[doc_text],
#         embeddings=[embedding.tolist()],
#         ids=[item['item_code']]
#     )
