from fastapi import APIRouter
from app.services.rag_service import generate_answer

router = APIRouter()


@router.get("/")
def chat(query: str):
    result = generate_answer(query)
    return result