# from database import Base
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy import create_engine
from pydantic import BaseModel
import chromadb
import requests
from sentence_transformers import SentenceTransformer
import json

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

TGI_URL = "http://llm:80/generate"

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
# collection = client.get_collection(name="inventory_data")

embedder = SentenceTransformer("all-MiniLM-L6-v2")

class QuestionRequest(BaseModel):
  question: str

@app.post("/ask")
async def ask(request: QuestionRequest):
  question_embedding = embedder.encode(request.question).tolist()

  print(collection.count())

  results = collection.query(
    query_embeddings=[question_embedding],
    n_results=2
  )

  retrieved_context = results["documents"][0]

  context = "\n".join(retrieved_context)
  prompt = f"Use the following supply data to answer:\n{context}\nQuestion: {request.question}"

  payload = {"inputs": prompt}
  try:
      response = requests.post(TGI_URL, json=payload, timeout=30)
      response.raise_for_status()
  except requests.RequestException as e:
      raise HTTPException(status_code=500, detail=f"Error querying LLM: {str(e)}")
    
  result = response.json()
  generated = result.get("generated_text", "")
  return {"answer": generated}

@app.get("/health")
def health():
  return {"status": "OK"}
