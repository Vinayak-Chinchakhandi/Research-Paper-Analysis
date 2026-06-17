from fastapi import APIRouter
from app.services.embedding_service import get_embeddings
from app.services.vector_store import search

router = APIRouter()


@router.get("/test-search")
def test_search(
    user_id: int,
    project_id: int,
    query: str
):

    # Convert query to embedding
    query_embedding = get_embeddings([query])[0]

    # Project-specific FAISS search
    results = search(
        user_id,
        project_id,
        query_embedding,
        top_k=5
    )

    return {
        "user_id": user_id,
        "project_id": project_id,
        "query": query,
        "results": results
    }