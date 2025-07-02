# from database import Base
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy import create_engine
import httpx

TGI_URL = "http://llm:80/generate"

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

# @app.post("/ask")
# async def ask(request: Request):
#   data = await request.json()
#   question = data.get("question", "")

#   q_embedding = embed_model.encode(question)

@app.get("/health")
def health():
  return {"status": "OK"}