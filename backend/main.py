from fastapi import FastAPI, HTTPException, status, Depends

# from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
import chromadb
import requests
from sentence_transformers import SentenceTransformer
from sqlalchemy.orm import Session
from database import get_db
from uuid import UUID
import os
import schemas, repositories

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# security = HTTPBearer()


tgi_url = os.environ["TGI_URL"]
sentence_embedding = os.environ["LOCAL_SENTENCE_VARIABLE_MODEL_DIR"]

client = chromadb.PersistentClient("./chroma_data")
collection = client.get_collection(name="inventory_data")

# token = os.getenv("HUGGING_FACE_HUB_TOKEN")

embedder = SentenceTransformer(sentence_embedding)

# def verify_token(credentials: HTTPAuthorizationCredentials=Depends(security)):
#     if credentials.credentials !=


@app.post("/ask", summary="AI Assistant to answer user's questions")
async def ask(request: schemas.QuestionRequest):
    question_embedding = embedder.encode(request.question).tolist()

    print(collection.count())

    results = collection.query(query_embeddings=[question_embedding], n_results=1)

    retrieved_context = results["documents"][0]

    context = "\n".join(retrieved_context)
    prompt = f"Use the following inventory data to answer:\n{context}\nQuestion: {request.question}"

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


@app.get(
    "/item",
    summary="List all items",
    status_code=status.HTTP_200_OK,
    response_model=list[schemas.Item],
)
async def get_items(db: Session = Depends(get_db)):
    return repositories.get_items(db)


@app.get(
    "/item/{item_id}",
    summary="Get item detail",
    status_code=status.HTTP_200_OK,
    response_model=schemas.Item,
)
async def get_item_detail(item_id: UUID, db: Session = Depends(get_db)):
    return repositories.get_item(db, item_id)


@app.post(
    "/item",
    summary="Create a new item",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.Item,
)
async def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    return repositories.create_item(db, item)


@app.get(
    "/inventory",
    summary="List all inventory details (e.g item name, item location, item quantity)",
    status_code=status.HTTP_200_OK,
    response_model=list[schemas.Inventory],
)
async def get_inventory(db: Session = Depends(get_db)):
    return repositories.get_inventories(db)


@app.get(
    "/inventory/{inventory_id}",
    summary="Get inventory detail",
    status_code=status.HTTP_200_OK,
    response_model=schemas.Inventory,
)
async def get_inventory_detail(inventory_id: UUID, db: Session = Depends(get_db)):
    return repositories.get_inventory(db, inventory_id)


@app.post(
    "/inventory",
    summary="Create inventory record (add item to inventory)",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.Inventory,
)
async def create_inventory_record(
    inventory: schemas.InventoryCreate, db: Session = Depends(get_db)
):
    return repositories.create_inventory(db=db, inventory=inventory)


@app.patch(
    "/inventory/{inventory_id}",
    summary="Partial update inventory record",
    status_code=status.HTTP_200_OK,
    response_model=schemas.Inventory,
)
async def partial_update_inventory(
    inventory_id: UUID,
    update_inventory: schemas.InventoryUpdate,
    db: Session = Depends(get_db),
):
    updated_inventory = repositories.update_inventory(
        inventory_id=inventory_id, update_inventory=update_inventory, db=db
    )
    if updated_inventory is not None:
        return updated_inventory
    else:
        raise HTTPException(status_code=400, detail="Inventory not found")


@app.get(
    "/location",
    summary="List all location",
    status_code=status.HTTP_200_OK,
    response_model=list[schemas.Location],
)
async def get_locations(db: Session = Depends(get_db)):
    return repositories.get_locations(db=db)


@app.get(
    "/location/{location_id}",
    summary="Get location details",
    status_code=status.HTTP_200_OK,
    response_model=schemas.Location,
)
async def get_location_details(location_id: UUID, db: Session = Depends(get_db)):
    return repositories.get_location_detail(db=db, location_id=location_id)


@app.post(
    "/location",
    summary="Create or add location data",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.Location,
)
async def create_location(
    location: schemas.LocationCreate, db: Session = Depends(get_db)
):
    return repositories.create_location(db=db, location=location)


@app.get(
    "/transaction",
    summary="Get list all transaction records",
    status_code=status.HTTP_200_OK,
    response_model=list[schemas.Transaction],
)
async def get_transactions(db: Session = Depends(get_db)):
    return repositories.get_transactions(db=db)


@app.get(
    "/transaction/{transaction_id}",
    summary="Get transaction details",
    status_code=status.HTTP_200_OK,
    response_model=schemas.Transaction,
)
async def get_transaction_detail(transaction_id: UUID, db: Session = Depends(get_db)):
    return repositories.get_transaction_detail(db=db, transaction_id=transaction_id)
