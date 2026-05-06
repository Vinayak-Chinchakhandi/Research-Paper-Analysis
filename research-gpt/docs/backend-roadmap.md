# 🚀 ResearchGPT Backend Roadmap

## ✅ Completed Features

* [x] PDF Upload API
* [x] File storage (local)
* [x] Text extraction (pdfplumber)
* [x] Chunking pipeline
* [x] Embedding generation (sentence-transformers)
* [x] FAISS vector storage (in-memory)

---

## ⚠️ Current Limitations

### 1. Duplicate File Handling

* Same PDF uploaded multiple times
* Stored with different UUIDs
* Embeddings duplicated in FAISS

👉 Impact:

* Increased memory usage
* Redundant search results

---

### 2. FAISS Persistence Missing

* FAISS index stored only in memory
* Data lost on server restart

---

### 3. No Metadata Tracking

* Chunks not linked to:

  * File ID
  * User
  * Project

---

## 🔥 Upcoming Improvements

### 🔹 1. File Deduplication (Hashing)

* Generate hash (MD5/SHA256) for each file
* Check if file already processed
* Skip embedding if duplicate

---

### 🔹 2. Persistent FAISS Storage

* Save index:

  * `faiss.write_index()`
* Save metadata:

  * `pickle` or database
* Load on server startup

---

### 🔹 3. Metadata Layer

Store for each chunk:

* source file
* chunk id
* project id

---

### 🔹 4. Database Integration (PostgreSQL)

* Users
* Projects
* File metadata
* Hash tracking

---

### 🔹 5. Optimized Retrieval

* Remove duplicate chunks
* Improve ranking

---

## 🎯 Future Vision

* Multi-paper comparison
* Research gap detection
* AI-powered literature survey
* Chat with research papers (RAG)
