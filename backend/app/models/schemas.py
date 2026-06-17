from pydantic import BaseModel


class ChatRequest(BaseModel):
    user_id: int
    project_id: int
    query: str


class SourceInfo(BaseModel):
    document_id: str
    source: str


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceInfo]