from fastapi import APIRouter, Depends

from app.services.rag_service import generate_answer

from app.models.schemas import (
    ChatRequest,
    ChatResponse
)

from app.core.security import (
    verify_internal_api_key
)

router = APIRouter()


@router.post(
    "/",
    response_model=ChatResponse,
    summary="Project-specific AI chat"
)
def chat(
    request: ChatRequest,
    _: None = Depends(verify_internal_api_key)
):

    result = generate_answer(
        request.user_id,
        request.project_id,
        request.query
    )

    return result