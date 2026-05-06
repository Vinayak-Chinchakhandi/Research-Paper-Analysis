from fastapi import APIRouter
from app.services.embedding_service import get_embeddings
from app.services.vector_store import search

router = APIRouter()


@router.get("/test-search")
def test_search(query: str):
    # Convert query to embedding
    query_embedding = get_embeddings([query])[0]

    # Search FAISS
    results = search(query_embedding, top_k=5)

    return {
        "query": query,
        "results": results
    }