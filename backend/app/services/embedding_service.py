import os
from dotenv import load_dotenv
from huggingface_hub import login
from sentence_transformers import SentenceTransformer

load_dotenv()

login(token=os.getenv("HF_TOKEN"))

model = SentenceTransformer(
    "sentence-transformers/all-MiniLM-L6-v2"
)

EMBEDDING_DIM = model.get_embedding_dimension()

def get_embeddings(chunks: list[str]):
    embeddings = model.encode(chunks)
    return embeddings