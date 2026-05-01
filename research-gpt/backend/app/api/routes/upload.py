from fastapi import APIRouter, UploadFile, File, Depends
from typing import List
import os
import uuid

from app.services.pdf_processor import extract_text_from_pdf
from app.services.chunking import chunk_text

router = APIRouter()

UPLOAD_DIR = "data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def file_upload_dependency(
    files: List[UploadFile] = File(..., description="Upload one or more PDF files")
):
    return files


@router.post("/", summary="Upload Research Papers")
async def upload_papers(
    files: List[UploadFile] = Depends(file_upload_dependency)
):
    results = []

    for file in files:
        unique_name = f"{uuid.uuid4()}_{file.filename}"
        file_path = os.path.join(UPLOAD_DIR, unique_name)

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
        chunks = chunk_text(text)

        results.append({
            "filename": file.filename,
            "num_chunks": len(chunks),
            "preview": chunks[0][:300] if chunks else "No content"
        })

    return {
        "message": "Files uploaded and processed successfully",
        "total_files": len(results),
        "papers": results
    }