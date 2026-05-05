from sentence_transformers import SentenceTransformer

# Load model once (global)
model = SentenceTransformer('all-MiniLM-L6-v2')
EMBEDDING_DIM = model.get_sentence_embedding_dimension()

def get_embeddings(chunks: list[str]):
    embeddings = model.encode(chunks)
    return embeddings