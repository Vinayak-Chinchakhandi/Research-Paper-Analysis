import faiss
import numpy as np
import os
import json
from pathlib import Path
from datetime import datetime
import uuid

BASE_DATA_DIR = Path("data/users")


def get_project_paths(user_id, project_id):

    project_root = (
        BASE_DATA_DIR
        / str(user_id)
        / "projects"
        / str(project_id)
    )

    uploads_dir = project_root / "uploads"

    faiss_dir = project_root / "faiss"

    metadata_path = faiss_dir / "metadata.json"

    documents_path = faiss_dir / "documents.json"

    index_path = faiss_dir / "index.faiss"

    uploads_dir.mkdir(
        parents=True,
        exist_ok=True
    )

    faiss_dir.mkdir(
        parents=True,
        exist_ok=True
    )

    return {
        "project_root": project_root,
        "uploads_dir": uploads_dir,
        "faiss_dir": faiss_dir,
        "metadata_path": metadata_path,
        "documents_path": documents_path,
        "index_path": index_path,
    }


# ✅ Initialize or load PROJECT index
def init_index(user_id, project_id, dimension):

    paths = get_project_paths(user_id, project_id)

    index_path = str(paths["index_path"])
    metadata_path = str(paths["metadata_path"])

    # Existing project index
    if os.path.exists(index_path):

        try:
            index = faiss.read_index(index_path)

            # Dimension mismatch safety
            if index.d != dimension:
                print("⚠️ Dimension mismatch. Rebuilding index...")
                index = faiss.IndexFlatL2(dimension)
                documents = []

                return index, documents

            if os.path.exists(metadata_path):

                with open(metadata_path, "r", encoding="utf-8") as f:
                    documents = json.load(f)

            else:
                documents = []

            return index, documents

        except Exception:
            print("⚠️ Corrupt index. Rebuilding...")

            index = faiss.IndexFlatL2(dimension)
            documents = []

            return index, documents

    else:
        # Create NEW project index
        index = faiss.IndexFlatL2(dimension)
        documents = []

        return index, documents


# ✅ Save PROJECT index + metadata
def save_index(
    user_id,
    project_id,
    index,
    documents
):

    paths = get_project_paths(user_id, project_id)

    index_path = str(paths["index_path"])
    metadata_path = str(paths["metadata_path"])

    faiss.write_index(index, index_path)

    with open(metadata_path, "w", encoding="utf-8") as f:

        json.dump(
            documents,
            f,
            ensure_ascii=False,
            indent=2
        )


# ✅ Store embeddings PROJECT-SPECIFIC
def store_embeddings(
    user_id,
    project_id,
    embeddings,
    chunks,
    document_id,
    original_name,
    stored_name
):

    index, documents = init_index(
        user_id,
        project_id,
        len(embeddings[0])
    )

    paths = get_project_paths(
        user_id,
        project_id
    )

    documents_path = paths["documents_path"]

    embeddings_array = np.array(
        embeddings
    ).astype("float32")

    # Add vectors to FAISS
    index.add(embeddings_array)

    created_at = datetime.utcnow().isoformat()

    # -----------------------------------
    # STORE DOCUMENT METADATA
    # -----------------------------------

    document_entry = {
        "document_id": document_id,
        "original_name": original_name,
        "stored_name": stored_name,
        "uploaded_at": created_at,
        "chunk_count": len(chunks)
    }

    # Load existing documents
    if os.path.exists(documents_path):

        with open(
            documents_path,
            "r",
            encoding="utf-8"
        ) as f:

            documents_data = json.load(f)

    else:
        documents_data = []

    documents_data.append(document_entry)

    with open(
        documents_path,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            documents_data,
            f,
            ensure_ascii=False,
            indent=2
        )

    # -----------------------------------
    # STORE CHUNK METADATA
    # -----------------------------------

    for chunk in chunks:

        documents.append({

            "chunk_id": str(uuid.uuid4()),

            "document_id": document_id,

            "text": chunk,

            "source": original_name,

            "created_at": created_at

        })

    # Save project metadata + FAISS
    save_index(user_id, project_id, index, documents)


# ✅ Search PROJECT-SPECIFIC index
def search(
    user_id,
    project_id,
    query_embedding,
    top_k=40
):

    # Load correct project index
    paths = get_project_paths(
        user_id,
        project_id
    )

    index_path = str(paths["index_path"])
    metadata_path = str(paths["metadata_path"])

    # No project index exists
    if (
        not os.path.exists(index_path)
        or
        not os.path.exists(metadata_path)
    ):
        return []

    # Load project FAISS
    index = faiss.read_index(index_path)

    with open(metadata_path, "r", encoding="utf-8") as f:
        documents = json.load(f)

    if len(documents) == 0:
        return []
    
    top_k = min(top_k, len(documents))

    query_embedding = np.array(
        [query_embedding]
    ).astype("float32")

    distances, indices = index.search(
        query_embedding,
        top_k
    )

    results = []

    for dist, i in zip(
        distances[0],
        indices[0]
    ):

        if i == -1 or i >= len(documents):
            continue

        doc = documents[i]

        results.append({

            "chunk_id": doc["chunk_id"],

            "document_id": doc["document_id"],

            "text": doc["text"],

            "source": doc["source"],

            "score": float(dist)

        })

    return results