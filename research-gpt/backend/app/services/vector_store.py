import faiss
import numpy as np

# Create FAISS index
dimension = 384  # for MiniLM model
index = faiss.IndexFlatL2(dimension)

# Store mapping
documents = []


def store_embeddings(embeddings, chunks):
    global documents

    embeddings = np.array(embeddings).astype("float32")

    index.add(embeddings)
    documents.extend(chunks)


def search(query_embedding, top_k=5):
    import numpy as np

    if len(documents) == 0:
        return ["No documents available. Please upload papers first."]

    query_embedding = np.array([query_embedding]).astype("float32")

    distances, indices = index.search(query_embedding, top_k)

    results = []

    for i in indices[0]:
        if i == -1:
            continue
        if 0 <= i < len(documents):
            results.append(documents[i])

    return results