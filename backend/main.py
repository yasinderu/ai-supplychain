from fastapi import FastAPI, HTTPException, Security
from fastapi.middleware.cors import CORSMiddleware
import chromadb
import requests
from sentence_transformers import SentenceTransformer
import os
import schemas
from routers import auth, items, users, inventories, locations, transactions, chats

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=auth.auth_router)
app.include_router(router=users.user_router)
app.include_router(router=items.item_router)
app.include_router(router=inventories.inventory_router)
app.include_router(router=locations.location_router)
app.include_router(router=transactions.transaction_router)
app.include_router(router=chats.chat_router)


tgi_url = os.environ["TGI_URL"]
sentence_embedding = os.environ["LOCAL_SENTENCE_VARIABLE_MODEL_DIR"]

client = chromadb.PersistentClient("./chroma_data")
collection = client.get_collection(name="inventory_data")
embedder = SentenceTransformer(sentence_embedding)


@app.post("/ask", summary="AI Assistant to answer user's questions")
async def ask(request: schemas.QuestionRequest, user=Security(auth.get_current_user)):
    question_embedding = embedder.encode(request.question).tolist()

    results = collection.query(query_embeddings=[question_embedding], n_results=1)

    retrieved_context = results["documents"][0]

    print(collection.count())

    context = "\n".join(retrieved_context)
    prompt = f"You're name is Kenny, you are an AI Assistant for inventory management system. Use the following inventory data to answer:\n{context}\nQuestion: {request.question}"

    payload = {"inputs": prompt}
    try:
        response = requests.post(tgi_url, json=payload, timeout=30)
        response.raise_for_status()
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error querying LLM: {str(e)}")

    result = response.json()
    generated = result.get("generated_text", "")
    return {"answer": generated}


@app.get("/health")
def health():
    return {"status": "OK"}
