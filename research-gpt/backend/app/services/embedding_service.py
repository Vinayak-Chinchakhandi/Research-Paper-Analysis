from sentence_transformers import SentenceTransformer

# Load model once (global)
model = SentenceTransformer('all-MiniLM-L6-v2')


def get_embeddings(chunks: list[str]):
    embeddings = model.encode(chunks)
    return embeddings