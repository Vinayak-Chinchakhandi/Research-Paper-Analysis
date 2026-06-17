from fastapi import APIRouter, UploadFile, File, Depends, Form
from typing import List
import uuid

from app.services.pdf_processor import extract_text_from_pdf
from app.services.chunking import chunk_text
from app.services.embedding_service import get_embeddings
from app.services.vector_store import (
    store_embeddings,
    init_index,
    get_project_paths
)

router = APIRouter()

def file_upload_dependency(
    files: List[UploadFile] = File(
        ...,
        description="Upload one or more PDF files"
    )
):
    return files


@router.post("/", summary="Upload Research Papers")
async def upload_papers(
    user_id: int = Form(...),
    project_id: int = Form(...),
    files: List[UploadFile] = Depends(file_upload_dependency)
):
    results = []

    # Initialize THIS project's FAISS
    EMBEDDING_DIM = 384

    init_index(
        user_id,
        project_id,
        EMBEDDING_DIM
    )

    paths = get_project_paths(
        user_id,
        project_id
    )

    uploads_dir = paths["uploads_dir"]


    for file in files:
        document_id = str(uuid.uuid4())
        unique_name = f"{uuid.uuid4()}_{file.filename}"
        file_path = uploads_dir / unique_name

        # Save file
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        # Extract text
        text = extract_text_from_pdf(file_path)

        if not text or text.startswith("Error"):
            results.append({
                "filename": file.filename,
                "error": "Text extraction failed"
            })
            continue

        # Chunking
        chunks = [c.strip() for c in chunk_text(text) if len(c.strip()) > 50]

        # Generate embeddings
        embeddings = get_embeddings(chunks)

        # Store in FAISS
        store_embeddings(
    user_id,
    project_id,
    embeddings,
    chunks,
    document_id,
    file.filename,
    unique_name
)

        results.append({

            "document_id": document_id,

            "original_name": file.filename,

            "stored_name": unique_name,

            "file_path": str(file_path),

            "chunk_count": len(chunks)

        })

    return {

        "message": "Files uploaded and processed successfully",

        "documents": results

    }