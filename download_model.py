from sentence_transformers import SentenceTransformer
import os

model_name = 'sentence-transformers/all-MiniLM-L6-v2'
local_model_path = './models/sentence-transformers/all-MiniLM-L6-v2'

# Ensure the directory exists
os.makedirs(local_model_path, exist_ok=True)

print(f"Downloading {model_name} to {local_model_path}...")
model = SentenceTransformer(model_name)
model.save(local_model_path)
print("Model downloaded and saved.")