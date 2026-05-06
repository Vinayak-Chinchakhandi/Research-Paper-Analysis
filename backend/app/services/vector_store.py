import faiss
import numpy as np
import os
import json

INDEX_PATH = "data/faiss_index/index.faiss"
META_PATH = "data/faiss_index/metadata.json"

# Global objects
index = None
documents = []


# ✅ Initialize or load index
def init_index(dimension):
    global index, documents

    os.makedirs("data/faiss_index", exist_ok=True)

    if os.path.exists(INDEX_PATH) and os.path.exists(META_PATH):
        try:
            index = faiss.read_index(INDEX_PATH)

            if index.d != dimension:
                print("⚠️ Dimension mismatch. Rebuilding index...")
                index = faiss.IndexFlatL2(dimension)
                documents = []
                return

            with open(META_PATH, "r", encoding="utf-8") as f:
                documents = json.load(f)

        except Exception:
            print("⚠️ Corrupt index. Rebuilding...")
            index = faiss.IndexFlatL2(dimension)
            documents = []
    else:
        index = faiss.IndexFlatL2(dimension)
        documents = []


# ✅ Save index + metadata
def save_index():
    global index, documents

    faiss.write_index(index, INDEX_PATH)

    with open(META_PATH, "w", encoding="utf-8") as f:
        json.dump(documents, f, ensure_ascii=False, indent=2)


# ✅ Store embeddings
def store_embeddings(embeddings, chunks, source):
    global index, documents

    embeddings_array = np.array(embeddings).astype("float32")

    # Add to FAISS
    index.add(embeddings_array)

    # Store metadata WITH embedding
    for i, chunk in enumerate(chunks):
        documents.append({
            "text": chunk,
            "source": source,
            "embedding": embeddings[i].tolist()   # 🔥 IMPORTANT
        })

    save_index()


# ✅ Search (multi-doc aware)
def search(query_embedding, top_k=40):
    global index, documents

    if index is None or len(documents) == 0:
        return []

    query_embedding = np.array([query_embedding]).astype("float32")

    distances, indices = index.search(query_embedding, top_k)

    results = []

    for dist, i in zip(distances[0], indices[0]):
        if i == -1 or i >= len(documents):
            continue

        doc = documents[i]

        results.append({
            "text": doc["text"],
            "source": doc["source"],
            "embedding": doc["embedding"],   # 🔥 ADD THIS
            "score": float(dist)
        })

    return results
    